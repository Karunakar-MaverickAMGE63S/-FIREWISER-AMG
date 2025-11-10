export enum Step {
  INPUT,
  CONSENT,
  LOADING,
  WISE_OUTPUT,
  CHECKLIST,
  COMMAND_LOADING,
  COMMAND_VIEW,
  AIR_OPS_LOADING,
  AIR_OPS,
}

export enum Role {
  PARENT = "Parents with Young Children",
  ADULTS_ONLY = "Adults-Only Household",
  TEENS_MS = "Household with Middle Schoolers",
  TEENS_HS = "Household with High Schoolers",
  UNIVERSITY_STUDENT = "University Student (On/Off-Campus)",
  YOUNG_ADULTS = "Young Adults / Roommates",
  ELDERLY = "Elderly / Senior Household",
}

export interface ChecklistItem {
  item: string;
  priority: number;
}

export interface WiseOutput {
  profile: string;
  evacuation_checklist: ChecklistItem[];
  psychological_coaching_messages: string[];
}

export interface AirQualityData {
  aqi: number;
  category: string;
  color: {
    red: number;
    green: number;
    blue: number;
  };
  dominantPollutant: string;
}

export interface WeatherData {
  temperature: number; // Fahrenheit
  humidity: number; // Percentage
  windSpeed: number; // MPH
  windDirection: string; // e.g., 'NNE'
  description: string;
}

export interface Dot {
  id: number;
  lat: number;
  lng: number;
  status: 'orange' | 'blue';
  path: { lat: number; lng: number }[];
  progress: number;
  speed: number;
  isUser?: boolean;
}

export interface Aircraft {
  id: number;
  type: 'plane' | 'helicopter';
  lat: number;
  lng: number;
  path: { lat: number; lng: number }[];
  progress: number;
  speed: number;
  status: 'en-route' | 'returning-to-base' | 'standby' | 'patrolling';
}
