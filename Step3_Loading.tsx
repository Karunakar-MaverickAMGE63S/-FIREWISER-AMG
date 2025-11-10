import React, { useEffect, useState } from 'react';
import { generateWiseOutput, getAirQualityData, getWeatherData } from '../services/aiService';
import type { Role, WiseOutput, AirQualityData, WeatherData } from '../types';
import { USER_START_POINT } from '../constants';

// Compact "data pod" for showing weather data as it loads
function WeatherDataPod({ data }: { data: WeatherData }) {
    return (
        <div className="bg-slate-50 p-3 rounded-lg animate-fade-in-fast border-2 border-orange-500 ring-2 ring-yellow-400">
            <h4 className="font-semibold text-slate-600 text-sm mb-2 text-left">Live Weather</h4>
            <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                    <p className="font-bold text-red-600 text-lg">{data.temperature}°F</p>
                    <p className="text-xs text-slate-500">Temp</p>
                </div>
                <div>
                    <p className="font-bold text-blue-600 text-lg">{data.humidity}%</p>
                    <p className="text-xs text-slate-500">Humidity</p>
                </div>
                <div>
                    <p className="font-bold text-orange-600 text-lg">{data.windSpeed}<span className="text-sm">mph</span></p>
                    <p className="text-xs text-slate-500">Wind</p>
                </div>
            </div>
        </div>
    );
}

// Compact "data pod" for showing air quality data as it loads
function AirQualityDataPod({ data }: { data: AirQualityData }) {
    return (
        <div className="bg-slate-50 p-3 rounded-lg animate-fade-in-fast border-2 border-orange-500 ring-2 ring-yellow-400">
            <h4 className="font-semibold text-slate-600 text-sm mb-2 text-left">Live Air Quality</h4>
            <div className="flex items-center justify-around">
                <div className="text-center">
                    <p className="text-3xl font-extrabold text-blue-600">{data.aqi}</p>
                    <p className="text-xs text-slate-500">AQI</p>
                </div>
                 <div className="text-center">
                    <p className="font-semibold text-lg text-blue-600">{data.category}</p>
                    <p className="text-xs text-slate-500">Hazard Level</p>
                </div>
            </div>
        </div>
    );
}

function OrchestrationIcon() {
    return (
        <svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <style>
                {`
                .ring {
                    fill: none;
                    stroke-width: 4;
                    stroke-linecap: round;
                    transform-origin: 50% 50%;
                }
                .ring1 {
                    stroke: #F97316; /* orange-500 */
                    animation: rotate1 2s linear infinite;
                }
                .ring2 {
                    stroke: #3B82F6; /* blue-600 */
                    animation: rotate2 2.5s linear infinite;
                }
                .ring3 {
                    stroke: #FBBF24; /* yellow-400 */
                    animation: rotate3 3s linear infinite;
                }
                .dot {
                    fill: #F97316;
                    animation: pulse 1.5s ease-in-out infinite alternate;
                    transform-origin: 50% 50%;
                }
                @keyframes rotate1 {
                    from { transform: rotate(0deg) scale(1); }
                    50% { transform: rotate(180deg) scale(0.95); }
                    to { transform: rotate(360deg) scale(1); }
                }
                @keyframes rotate2 {
                    from { transform: rotate(0deg) scale(1); }
                    50% { transform: rotate(-180deg) scale(1.05); }
                    to { transform: rotate(-360deg) scale(1); }
                }
                 @keyframes rotate3 {
                    from { transform: rotate(0deg) scale(1); }
                    50% { transform: rotate(180deg) scale(1); }
                    to { transform: rotate(360deg) scale(1); }
                }
                @keyframes pulse {
                    from { r: 8; opacity: 1; }
                    to { r: 10; opacity: 0.7; }
                }
                `}
            </style>
            <circle className="ring ring1" cx="50" cy="50" r="45" strokeDasharray="200 82.7" />
            <circle className="ring ring2" cx="50" cy="50" r="35" strokeDasharray="150 70" />
            <circle className="ring ring3" cx="50" cy="50" r="25" strokeDasharray="100 55.8" />
            <circle className="dot" cx="50" cy="50" r="8" />
        </svg>
    );
}

interface Step3LoadingProps {
  role: Role;
  zipCode: string; // zipCode is passed for data enrichment and logging
  onComplete: (output: WiseOutput, aqData: AirQualityData | null, weatherData: WeatherData | null) => void;
}

// FIX: Corrected typo in function signature to match interface name `Step3LoadingProps`.
function Step3_Loading({ role, zipCode, onComplete }: Step3LoadingProps) {
  const [airQualityData, setAirQualityData] = useState<AirQualityData | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [currentMessage, setCurrentMessage] = useState("Initializing secure connection...");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const TOTAL_DURATION = 12000; // 12 seconds total load time

    // --- Parallel Data Fetching ---
    const wisePromise = generateWiseOutput(role);
    const weatherPromise = getWeatherData(USER_START_POINT.lat, USER_START_POINT.lng);
    const airQualityPromise = getAirQualityData(USER_START_POINT.lat, USER_START_POINT.lng);

    // --- Choreographed UI Updates ---
    const timeouts = [
      setTimeout(() => {
        if (!isMounted) return;
        setCurrentMessage("Fetching environmental data...");
        // Update UI with weather and AQI data as soon as they resolve
        weatherPromise.then(data => isMounted && setWeatherData(data));
        airQualityPromise.then(data => isMounted && setAirQualityData(data));
      }, TOTAL_DURATION * 0.25),

      setTimeout(() => {
        if (!isMounted) return;
        setCurrentMessage("Generating guidance with AI...");
      }, TOTAL_DURATION * 0.5),

      setTimeout(() => {
        if (!isMounted) return;
        setCurrentMessage("Finalizing your personalized plan...");
      }, TOTAL_DURATION * 0.9),
    ];
    
    // --- Progress Bar Animation ---
    const progressInterval = setInterval(() => {
        setProgress(p => {
            const newProgress = p + (100 / (TOTAL_DURATION / 100));
            if (newProgress >= 100) {
                clearInterval(progressInterval);
                return 100;
            }
            return newProgress;
        });
    }, 100);

    // --- Completion Trigger ---
    const finalTimeout = setTimeout(async () => {
      if (!isMounted) return;
      
      try {
        const [wiseResult, weatherResult, airQualityResult] = await Promise.all([wisePromise, weatherPromise, airQualityPromise]);
        
        setCurrentMessage("Your plan is ready!");
        
        setTimeout(() => {
          if(isMounted) {
            onComplete(wiseResult, airQualityResult, weatherResult);
          }
        }, 500);

      } catch (error) {
        console.error("Failed to load all data for the plan:", error);
        // Gracefully complete with whatever data resolved, as services have their own fallbacks
        const wiseResult = await wisePromise;
        const weatherResult = await weatherPromise;
        const airQualityResult = await airQualityPromise;
        
        setCurrentMessage("Your plan is ready!");
        setTimeout(() => {
          if(isMounted) {
            onComplete(wiseResult, airQualityResult, weatherResult);
          }
        }, 500);
      }
    }, TOTAL_DURATION);

    return () => {
      isMounted = false;
      timeouts.forEach(clearTimeout);
      clearInterval(progressInterval);
      clearTimeout(finalTimeout);
    };
  }, [role, zipCode, onComplete]);


  return (
    <div className="w-full bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl text-center animate-fade-in border-4 border-orange-500 ring-4 ring-yellow-400">
        <div className="flex justify-center items-center mb-6">
             <OrchestrationIcon />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4">
            <span className="text-orange-600">FIREWISER</span> is Orchestrating Your Personalized Evacuation Plan
        </h2>
        
        <div className="w-full bg-slate-200 rounded-full h-4 mb-4 overflow-hidden border border-slate-300">
            <div 
              className="bg-orange-500 h-full rounded-full transition-all duration-300 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
        </div>
        
        <p className="text-sm sm:text-base text-slate-500 min-h-[1.5rem] flex items-center justify-center transition-opacity duration-300" aria-live="polite">
            {currentMessage}
        </p>

        {/* Container for the live data pods */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {weatherData ? <WeatherDataPod data={weatherData} /> : <div className="bg-slate-100 h-28 rounded-lg animate-pulse"></div>}
            {airQualityData ? <AirQualityDataPod data={airQualityData} /> : <div className="bg-slate-100 h-28 rounded-lg animate-pulse"></div>}
        </div>
    </div>
  );
}

export default Step3_Loading;