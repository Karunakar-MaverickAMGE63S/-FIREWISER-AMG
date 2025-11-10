import { GoogleGenAI, Type } from '@google/genai';
import { ROLE_BASED_GUIDANCE } from '../constants';
import { Role } from '../types';
import type { WiseOutput, AirQualityData, WeatherData, Dot } from '../types';

// NOTE: In a real-world production app, exposing an API key on the client-side is a security risk.
// This key is for the Google Air Quality API. It should be handled by a secure backend proxy.
// For this self-contained demo, it's included here and should be restricted in the Google Cloud Console.
const AIR_QUALITY_API_KEY = 'AIzaSyD6cQbFjEHHG59FvCEBrRoau72VkpafH0E';

export const getAirQualityData = async (lat: number, lng: number): Promise<AirQualityData | null> => {
  const url = `https://airquality.googleapis.com/v1/currentConditions:lookup?key=${AIR_QUALITY_API_KEY}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        location: { latitude: lat, longitude: lng },
        "universalAqi": true
      }),
    });
    if (!response.ok) {
      console.error('Air Quality API request failed:', response.status, await response.text());
      return null;
    }
    const data = await response.json();
    if (data?.indexes?.[0]) {
      const uaqi = data.indexes[0];
      return {
        aqi: uaqi.aqi,
        category: uaqi.category,
        color: uaqi.color || { red: 0.5, green: 0.5, blue: 0.5 },
        dominantPollutant: uaqi.dominantPollutant,
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching air quality data:', error);
    return null;
  }
};

export const getWeatherData = async (lat: number, lng: number): Promise<WeatherData | null> => {
  console.log(`Simulating weather data for coords: ${lat}, ${lng}`);
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
  try {
    const temp = 92 + Math.floor(Math.random() * 8);
    const humidity = 12 + Math.floor(Math.random() * 8);
    const windSpeed = 20 + Math.floor(Math.random() * 10);
    const windDirections = ['NNE', 'NE', 'ENE'];
    const windDirection = windDirections[Math.floor(Math.random() * windDirections.length)];
    return {
      temperature: temp,
      humidity,
      windSpeed,
      windDirection,
      description: "Critical fire weather conditions detected.",
    };
  } catch (error) {
    console.error('Error simulating weather data:', error);
    return null;
  }
};

export const getOptimalDropZone = async (enRouteDots: Dot[], fireCenter: { lat: number; lng: number }): Promise<{ lat: number; lng: number } | null> => {
  if (enRouteDots.length === 0) return null;
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate processing time
  try {
    const dotsWithDistance = enRouteDots.map(dot => ({
      ...dot,
      dist: Math.sqrt(Math.pow(dot.lat - fireCenter.lat, 2) + Math.pow(dot.lng - fireCenter.lng, 2)),
    }));
    dotsWithDistance.sort((a, b) => a.dist - b.dist);
    const clusterSize = Math.max(5, Math.ceil(dotsWithDistance.length * 0.2));
    const atRiskCluster = dotsWithDistance.slice(0, clusterSize);
    if (atRiskCluster.length === 0) return null;
    const totalLat = atRiskCluster.reduce((sum, dot) => sum + dot.lat, 0);
    const totalLng = atRiskCluster.reduce((sum, dot) => sum + dot.lng, 0);
    return {
      lat: totalLat / atRiskCluster.length,
      lng: totalLng / atRiskCluster.length,
    };
  } catch (error) {
    console.error("Error in AI drop zone calculation:", error);
    return null;
  }
};


export const generateWiseOutput = async (role: Role): Promise<WiseOutput> => {
  const systemInstruction = `You are the FIREWISER Hyper-Personalized Guidance Engine. Your sole function is to act as a reliable, machine-readable policy engine. You MUST ingest the user's demographic profile and output a single, strict JSON object that adheres precisely to the provided JSON schema. DO NOT output any prose, markdown, or explanation outside of the JSON object.`;
  const prompt = `Generate the evacuation guidance for the following user profile: ${role}`;

  try {
    // The API key is sourced from environment variables, which is a security best practice.
    // In this sandboxed environment, assume process.env.API_KEY is correctly configured.
    if (!process.env.API_KEY) {
      console.warn("API_KEY not found. Using fallback data. For full functionality, ensure the API_KEY is set in your environment.");
      throw new Error("API_KEY is not configured.");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            profile: { type: Type.STRING },
            evacuation_checklist: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  item: { type: Type.STRING },
                  priority: { type: Type.INTEGER }
                },
                required: ['item', 'priority']
              }
            },
            psychological_coaching_messages: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ['profile', 'evacuation_checklist', 'psychological_coaching_messages']
        },
      },
    });
    
    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    
    if (result.profile && result.evacuation_checklist && result.psychological_coaching_messages) {
      return result;
    } else {
      console.error("Gemini response did not match the required schema.");
      throw new Error("Invalid response structure from Gemini.");
    }

  } catch (error) {
    console.error("Error executing Gemini flow, using fallback data:", error);
    return ROLE_BASED_GUIDANCE[role] || ROLE_BASED_GUIDANCE[Role.PARENT];
  }
};
