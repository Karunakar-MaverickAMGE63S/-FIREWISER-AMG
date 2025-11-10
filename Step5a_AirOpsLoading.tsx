import React, { useEffect, useState } from 'react';

interface StepAirOpsLoadingProps {
  onComplete: () => void;
}

const loadingMessages = [
    "Connecting to aerial fleet network...",
    "Accessing real-time ground telemetry...",
    "Powering on AI for target acquisition...",
    "Calculating optimal drop zones...",
    "Rendering tactical air command interface...",
    "Finalizing Air Operations View...",
];

// Replaced the complex tactical animation with a simple, elegant floating plane icon.
function AdvancedAirOpsIcon() {
    return (
        <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
            <style>
                {`
                .plane-container {
                    animation: float-animation 3s ease-in-out infinite alternate;
                    transform-origin: center;
                }
                .plane {
                    fill: #3b82f6; /* blue-600 */
                    stroke: #ffffff;
                    stroke-width: 1;
                }
                @keyframes float-animation {
                    from {
                        transform: translateY(5px);
                        filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.1));
                    }
                    to {
                        transform: translateY(-5px);
                        filter: drop-shadow(0 20px 13px rgb(0 0 0 / 0.15));
                    }
                }
                `}
            </style>
            <g className="plane-container">
                 {/* The plane is scaled up, rotated, and centered in the viewbox */}
                <g transform="translate(48, 48) scale(2.5) rotate(45)">
                    <path className="plane" d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                </g>
            </g>
        </svg>
    );
}

function Step5a_AirOpsLoading({ onComplete }: StepAirOpsLoadingProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const TOTAL_DURATION = 8000; // 8 seconds

    const messageInterval = setInterval(() => {
      setCurrentMessageIndex(prevIndex => {
        if (prevIndex < loadingMessages.length - 1) {
          return prevIndex + 1;
        }
        return prevIndex;
      });
    }, TOTAL_DURATION / loadingMessages.length);

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

    const finalTimeout = setTimeout(() => {
      onComplete();
    }, TOTAL_DURATION);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
      clearTimeout(finalTimeout);
    };
  }, [onComplete]);

  return (
    <div className="w-full bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl text-center animate-fade-in border-4 border-orange-500 ring-4 ring-yellow-400">
        <div className="flex justify-center items-center mb-6">
            <AdvancedAirOpsIcon />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4">
            Initializing <span className="text-orange-600">Air Operations Command</span>
        </h2>
        
        <div className="w-full bg-slate-200 rounded-full h-2 mb-4 overflow-hidden border border-slate-300">
            <div 
              className="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full transition-all duration-300 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
        </div>
        
        <p className="text-sm sm:text-base text-slate-500 min-h-[1.5rem] flex items-center justify-center transition-opacity duration-300" aria-live="polite">
            {loadingMessages[currentMessageIndex]}
        </p>
    </div>
  );
}

export default Step5a_AirOpsLoading;