// --- START of file: constants.tsx ---
import { Role, type WiseOutput } from './types';

export const ROLE_BASED_GUIDANCE: Record<Role, WiseOutput> = {
  [Role.PARENT]: {
    profile: Role.PARENT,
    evacuation_checklist: [
      { item: "Secure Children First: Immediately gather children to a central, safe location.", priority: 1 },
      { item: "Grab Family Go-Bag: Prioritize documents, water, and child-specific needs (meds, formula).", priority: 2 },
      { item: "Dress for Safety: Ensure everyone wears long sleeves, pants, and sturdy closed-toe shoes.", priority: 3 },
      { item: "Pack One Comfort Item: A small toy or blanket can significantly reduce a child's anxiety.", priority: 4 },
      { item: "Project Calm Confidence: Your demeanor is critical for keeping children focused and calm.", priority: 5 }
    ],
    psychological_coaching_messages: ["Your children look to you for safety. Breathe. You have a plan. Follow the route. You are capable and in control."]
  },
  [Role.ADULTS_ONLY]: {
    profile: Role.ADULTS_ONLY,
    evacuation_checklist: [
      { item: "Confirm Partner Readiness: Verbally sync your immediate evacuation actions.", priority: 1 },
      { item: "Secure Critical Documents & Backups: Grab Go-Bag with passports, insurance, and digital backups.", priority: 2 },
      { item: "Execute Home Shutdown Protocol (Time Permitting): Turn off gas and utilities.", priority: 3 },
      { item: "Verify Vehicle Readiness: Confirm fuel level and that the emergency kit is accessible.", priority: 4 },
      { item: "Activate Communication Tree: Notify your designated out-of-state emergency contact.", priority: 5 }
    ],
    psychological_coaching_messages: ["Your coordination is your strength. Execute your plan efficiently. Focus on a swift and safe departure. You are prepared for this."]
  },
   [Role.TEENS_MS]: {
    profile: Role.TEENS_MS,
    evacuation_checklist: [
      { item: "Delegate Pre-Assigned Tasks: Have teens execute their roles (e.g., pack chargers, secure pets).", priority: 1 },
      { item: "Power & Communication Check: Ensure all mobile devices and power banks are packed.", priority: 2 },
      { item: "Confirm Protective Attire: Verify everyone is wearing long pants and sturdy, closed-toe shoes.", priority: 3 },
      { item: "Personal Go-Bag Accountability: Confirm each teen has their pre-packed emergency bag.", priority: 4 },
      { item: "Review Evacuation Protocols: Briefly reiterate the family communication and rally point plan.", priority: 5 }
    ],
    psychological_coaching_messages: ["Your teens can be a great help. Give clear, calm instructions. Their focus will mirror yours. Work together to get to safety quickly."]
  },
  [Role.TEENS_HS]: {
    profile: Role.TEENS_HS,
    evacuation_checklist: [
      { item: "Execute Coordinated Shutdown: Task teens with securing all windows and doors.", priority: 1 },
      { item: "Verify Critical Supplies: Confirm teens have packed their personal documents and medications.", priority: 2 },
      { item: "Coordinate Vehicle & Pet Duties: Designate one teen for vehicle prep, another for pets.", priority: 3 },
      { item: "Route Confirmation: Briefly review the primary and secondary digital evacuation routes.", priority: 4 },
      { item: "Establish Digital Check-in: Activate a group chat for continuous communication during transit.", priority: 5 }
    ],
    psychological_coaching_messages: ["Your older teens are capable partners in this. Trust them with responsibilities. Clear communication is key. Move out as a unified team."]
  },
  [Role.UNIVERSITY_STUDENT]: {
    profile: Role.UNIVERSITY_STUDENT,
    evacuation_checklist: [
      { item: "Secure Academic & Personal IDs: Pack laptop, phone, chargers, government and student IDs.", priority: 1 },
      { item: "Pack Essentials Only: Prioritize medications, a water bottle, and one change of clothes.", priority: 2 },
      { item: "Activate Communication Plan: Notify family/emergency contact and monitor official university alerts.", priority: 3 },
      { item: "Confirm Evacuation Point: Identify the designated university assembly area or your personal route.", priority: 4 },
      { item: "Secure Residence (Time Permitting): Close windows and lock your door upon exiting.", priority: 5 }
    ],
    psychological_coaching_messages: ["Focus on your personal safety first. Gather your essentials quickly and move to a designated safe area. You've got this."]
  },
  [Role.YOUNG_ADULTS]: {
    profile: Role.YOUNG_ADULTS,
    evacuation_checklist: [
      { item: "Immediate Household Huddle: Confirm all roommates are accounted for and establish a carpool plan.", priority: 1 },
      { item: "Personal Go-Bags Only: Each person is responsible for their own pre-packed emergency kit.", priority: 2 },
      { item: "Designate a Shutdown Lead: One person is responsible for a final check of windows and utilities (if safe).", priority: 3 },
      { item: "Establish Digital Comms: Create a group chat for status updates during evacuation.", priority: 4 },
      { item: "Perform Final Headcount: Verbally confirm everyone is present before departing the residence.", priority: 5 }
    ],
    psychological_coaching_messages: ["Your biggest advantage is teamwork. Communicate clearly, divide tasks, and get out safely. Look out for each other."]
  },
  [Role.ELDERLY]: {
    profile: Role.ELDERLY,
    evacuation_checklist: [
      { item: "Prioritize Medical Essentials: Pack a 7-day supply of all medications and prescriptions.", priority: 1 },
      { item: "Secure Mobility & Sensory Aids: Ensure you have walkers, canes, glasses, and hearing aids.", priority: 2 },
      { item: "Grab Critical Documents Go-Bag: Must include ID, insurance cards, and emergency contacts.", priority: 3 },
      { item: "Dress for Safety & Comfort: Wear sturdy, closed-toe shoes and layered clothing.", priority: 4 },
      { item: "Activate Support Network: Notify a designated family member or contact that you are evacuating.", priority: 5 }
    ],
    psychological_coaching_messages: ["Take your time, but do not delay. Follow each step carefully. Help is available at the destination. You are strong and capable."]
  },
};

// --- Map Configuration Constants ---
export const USER_START_POINT = { lat: 34.031, lng: -118.705 };
export const SHELTER_POINT = { lat: 34.058, lng: -118.645 };

export const SAFE_ROUTE_PATH = [
  USER_START_POINT,
  { lat: 34.038, lng: -118.700 },
  { lat: 34.045, lng: -118.680 },
  { lat: 34.050, lng: -118.660 },
  SHELTER_POINT,
];

// Locations for the animated flame icons on the map perimeter
// 7 flames on the western (left) side of the fire
export const FLAME_LOCATIONS_WEST = [
  { lat: 34.026, lng: -118.755 },
  { lat: 34.032, lng: -118.762 },
  { lat: 34.036, lng: -118.750 },
  { lat: 34.029, lng: -118.735 },
  { lat: 34.020, lng: -118.728 },
  { lat: 34.024, lng: -118.745 },
  { lat: 34.039, lng: -118.758 },
];

// 5 flames on the eastern (right) side of the fire, near the predicted spread
export const FLAME_LOCATIONS_EAST = [
  { lat: 34.040, lng: -118.690 },
  { lat: 34.052, lng: -118.675 },
  { lat: 34.045, lng: -118.665 },
  { lat: 34.038, lng: -118.678 },
  { lat: 34.050, lng: -118.685 },
];

// Configuration for the entire aerial fleet
export const AIRCRAFT_FLEET_CONFIG = [
  {
    id: 101, // The commandable air tanker
    type: 'plane',
    status: 'standby',
    speed: 0, // Stationary
    path: [ // A single point, defined twice to prevent heading calculation errors
      { lat: 34.050, lng: -118.670 },
      { lat: 34.050, lng: -118.670 },
    ],
  },
  {
    id: 202, // Recon plane 1
    type: 'plane',
    status: 'en-route',
    speed: 0.0001, // Very slow patrol speed
    path: [ // Moves slowly across the evacuation zone
      { lat: 34.025, lng: -118.720 },
      { lat: 34.048, lng: -118.675 },
    ],
  },
  {
    id: 303, // Recon plane 2
    type: 'plane',
    status: 'en-route',
    speed: 0.00012, // Slightly different very slow speed
    path: [ // Another path across the evacuation zone
      { lat: 34.035, lng: -118.725 },
      { lat: 34.052, lng: -118.672 },
    ],
  },
];

/**
 * Generates a dynamic, multi-layered SVG flame icon with a glow effect 
 * for realistic fire visualization on the map.
 */
export function AdvancedFlameIconSvgString(size = 50, state = 0) {
    const paths = [
        // State 0 - Base wide flame
        {
            red: "M 25,50 C 0,45 0,20 15,10 C 20,0 30,0 35,10 C 50,20 50,45 25,50 Z",
            orange: "M 25,50 C 5,45 5,25 18,15 C 22,5 28,5 32,15 C 45,25 45,45 25,50 Z",
            yellow: "M 25,50 C 10,48 10,35 20,25 C 23,18 27,18 30,25 C 40,35 40,48 25,50 Z"
        },
        // State 1 - Taller flicker
        {
            red: "M 25,50 C 0,45 0,15 18,5 C 22,-5 28,-5 32,5 C 50,15 50,45 25,50 Z",
            orange: "M 25,50 C 5,45 5,20 20,10 C 23,2 27,2 30,10 C 45,20 45,45 25,50 Z",
            yellow: "M 25,50 C 10,48 10,30 22,20 C 24,14 26,14 28,20 C 40,30 40,48 25,50 Z"
        },
        // State 2 - Asymmetrical flicker
        {
            red: "M 25,50 C 0,45 0,20 12,5 C 18,-5 25,5 35,12 C 50,22 50,45 25,50 Z",
            orange: "M 25,50 C 5,45 5,25 16,12 C 20,2 27,10 32,18 C 45,28 45,45 25,50 Z",
            yellow: "M 25,50 C 10,48 10,35 18,22 C 22,15 26,20 30,28 C 40,35 40,48 25,50 Z"
        }
    ];

    const currentPath = paths[state % paths.length];

    return `
    <svg width="${size}" height="${size}" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" style="overflow: visible;">
        <defs>
            <filter id="flameGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        <g filter="url(#flameGlow)">
            <path d="${currentPath.red}" fill="rgb(220, 38, 38)"/>
            <path d="${currentPath.orange}" fill="rgb(249, 115, 22)"/>
            <path d="${currentPath.yellow}" fill="rgb(252, 211, 77)"/>
        </g>
    </svg>
    `;
}

export function FireIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-orange-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.362-3.797A8.33 8.33 0 0 1 15.362 5.214Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75a7.5 7.5 0 0 0 15 0v-1.5a7.5 7.5 0 0 0-15 0v1.5Z" />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-orange-500">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  );
}

export function HeartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-orange-500">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  );
}

export function GeminiIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-orange-500">
      <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 3a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 009 9 9 9 0 009-9h-3a6 6 0 01-6 6 6 6 0 01-6-6H3z"/>
      <path d="M12 5.5l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5L12 5.5z" />
    </svg>
  );
}

export function WindIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-orange-500">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.125 1.125 0 0 1 0 2.25H5.625a1.125 1.125 0 0 1 0-2.25Z" />
    </svg>
  );
}

export function ThermometerIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v10.5a3 3 0 0 0 3 3Z" />
    </svg>
  );
}

export function DropletIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-5.18 0-9.42 4.24-9.42 9.42 0 4.14 2.68 7.65 6.33 8.84.2.07.43.1.65.1h4.88c.22 0 .45-.03.65-.1 3.65-1.19 6.33-4.7 6.33-8.84C21.42 6.49 17.18 2.25 12 2.25Z" />
    </svg>
  );
}

export function ShelterIcon({ className = "w-8 h-8 text-blue-700" }: { className?: string }) {
  // This is now the Shield with a Checkmark icon for UI consistency
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z" />
        <path d="M10.5 15.5l-3-3 1-1 2 2 4.5-4.5 1 1 -5.5 5.5z" fill="#FFFFFF"/>
    </svg>
  );
}

export function EnRouteIcon({ className = "w-6 h-6 text-orange-700" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13.49 5.49c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/>
    </svg>
  );
}

export function AircraftIcon({ className = "w-8 h-8 text-slate-700" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
    </svg>
  );
}

export function HelicopterIcon({ className = "w-8 h-8 text-blue-700" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2L11 4.5V9H4l-2 2v2l2 2h7v4.5l1 2.5 1-2.5V15h7l2-2v-2l-2-2h-7V4.5L12 2z"/>
    </svg>
  );
}

// --- SVG Strings for Google Maps Markers ---

export function BlueShieldIconSvgString(size = 40) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shieldGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
        </filter>
      </defs>
      <g>
        <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z" fill="#1D4ED8" filter="url(#shieldGlow)"/>
        <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z" fill="#3B82F6" stroke="#FFFFFF" stroke-width="1"/>
        <path d="M10.5 15.5l-3-3 1-1 2 2 4.5-4.5 1 1 -5.5 5.5z" fill="#FFFFFF"/>
      </g>
    </svg>
  `;
}

// Pure white plane for high visibility on the map
export function AircraftIconSvgString(size = 40, rotation = 0) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="transform-origin: center; transform: rotate(${rotation}deg);">
      <g fill="#FFFFFF" stroke="#374151" stroke-width="1.5">
        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
      </g>
    </svg>
  `;
}

// Blue helicopter
export function HelicopterIconSvgString(size = 40, rotation = 0) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="transform-origin: center; transform: rotate(${rotation}deg);">
      <g fill="#3B82F6" stroke="#FFFFFF" stroke-width="1">
        <path d="M12 2L11 4.5V9H4l-2 2v2l2 2h7v4.5l1 2.5 1-2.5V15h7l2-2v-2l-2-2h-7V4.5L12 2z"/>
      </g>
    </svg>
  `;
}

// Sky blue drop zone
export function DropZoneIconSvgString(size = 60) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" style="overflow: visible;">
      <style>
        .pulse-ring {
          stroke: #38BDF8; /* Sky blue */
          stroke-width: 4;
          animation: pulse 2s cubic-bezier(0, 0, 0.2, 1) infinite;
          transform-origin: 30px 30px;
        }
        @keyframes pulse {
          0% {
            transform: scale(0.33);
            opacity: 1;
          }
          80%, 100% {
            transform: scale(1);
            opacity: 0;
          }
        }
        .crosshair {
          stroke: #FFFFFF;
          stroke-width: 2.5;
          stroke-linecap: round;
        }
        .center-dot {
          fill: #38BDF8; /* Sky blue */
          stroke: #FFFFFF;
          stroke-width: 2;
        }
      </style>
      <circle class="pulse-ring" cx="30" cy="30" r="10" fill="none" />
      <g>
        <line x1="30" y1="10" x2="30" y2="22" class="crosshair"/>
        <line x1="30" y1="38" x2="30" y2="50" class="crosshair"/>
        <line x1="10" y1="30" x2="22" y2="30" class="crosshair"/>
        <line x1="38" y1="30" x2="50" y2="30" class="crosshair"/>
        <circle class="center-dot" cx="30" cy="30" r="6"/>
      </g>
    </svg>
  `;
}
// --- END OF FILE: constants.tsx ---