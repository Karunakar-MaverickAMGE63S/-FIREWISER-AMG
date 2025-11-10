
import React, { useState, useEffect } from 'react';
import Map from './Map';
import type { Aircraft } from '../types';
import { AIRCRAFT_FLEET_CONFIG, AircraftIcon } from '../constants';
import { getOptimalDropZone } from '../services/aiService';
import Button from './common/Button';
import type { Dot } from '../types';

// The geographical area from which evacuees are simulated for AI calculations.
const EVAC_ZONE_BOUNDS = {
  north: 34.045,
  south: 34.020,
  west: -118.725,
  east: -118.690,
};

// --- Sub-components for Air Operations View ---

function CommandExecutionTerminal({ onSendCommand, optimalDropZone, disabled }: {
  onSendCommand: () => void;
  optimalDropZone: { lat: number; lng: number } | null;
  disabled: boolean;
}) {
  const [draftMessage, setDraftMessage] = useState('');
  const [isVetting, setIsVetting] = useState(false);
  const [finalCommand, setFinalCommand] = useState<string | null>(null);

  useEffect(() => {
    if (disabled) {
      setDraftMessage('COMMAND SENT. Air asset acknowledged.');
      setFinalCommand('TINKER 34: AFFIRMATIVE. EN ROUTE TO TARGET.');
    } else if (optimalDropZone) {
      setDraftMessage(`Tinker 34 drop on that cluster ${optimalDropZone.lat.toFixed(4)} ${optimalDropZone.lng.toFixed(4)}`);
    } else {
      setDraftMessage('Awaiting optimal drop zone calculation...');
    }
  }, [optimalDropZone, disabled]);

  const handleVetCommand = async () => {
    if (!optimalDropZone) return;
    setIsVetting(true);
    // Simulate Cloud AI Vetting with Gemini Pro/AWS
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const vettedCommand = `TINKER 34: AFFIRMATIVE. PROCEED DROP COORDINATES ${optimalDropZone.lat.toFixed(4)}, ${optimalDropZone.lng.toFixed(4)}. LINE CRITICAL.`;
    setFinalCommand(vettedCommand);
    setIsVetting(false);
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow-xl border-4 border-orange-500 ring-4 ring-yellow-400">
      <h4 className="text-sm font-bold text-slate-500 tracking-wider mb-2">COMMAND EXECUTION TERMINAL</h4>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="draft-message" className="block text-sm font-semibold text-blue-800 mb-1">Commander's Draft:</label>
          <textarea
            id="draft-message"
            rows={3}
            value={draftMessage}
            onChange={(e) => setDraftMessage(e.target.value)}
            className="w-full p-3 font-mono text-lg bg-blue-800 text-orange-400 border-2 border-orange-500 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 disabled:bg-blue-900 disabled:text-orange-700 placeholder-blue-400"
            placeholder="DRAFT COMMAND..."
            disabled={disabled || isVetting || !optimalDropZone}
          />
        </div>

        {!finalCommand && (
          <Button
            onClick={handleVetCommand}
            disabled={disabled || isVetting || !draftMessage}
            variant="primary"
          >
            {isVetting ? 'VETTING COMMAND...' : '[ VET & GENERATE COMMAND ]'}
          </Button>
        )}

        {finalCommand && (
          <div className="p-3 bg-blue-50 rounded-md border-2 border-blue-500">
            <p className="text-sm font-semibold text-blue-800">Final Vetted Command:</p>
            <p className="text-md text-blue-900 font-mono font-bold">{finalCommand}</p>
            <p className="text-xs text-slate-400 mt-2 text-right">Cloud AI Verified Syntax & Coordinates</p>
          </div>
        )}

        {finalCommand && !disabled && (
           <Button onClick={onSendCommand} disabled={disabled} variant="secondary">
            SEND COMMAND TO AIR ASSET
          </Button>
        )}
      </div>
    </div>
  );
}


function AirOpsCard({ aircraft, dropZone, isLoading }: {
  aircraft: Aircraft | null;
  dropZone: { lat: number, lng: number } | null;
  isLoading: boolean;
}) {
    // Derives status directly from the aircraft state object for real-time accuracy
    const statusText = aircraft?.status || 'Standby';
    let statusColor: string;
    switch (statusText) {
        case 'en-route':
            statusColor = 'bg-orange-200 text-orange-800';
            break;
        case 'returning-to-base':
            statusColor = 'bg-blue-200 text-blue-800';
            break;
        case 'standby':
        case 'patrolling':
        default:
            statusColor = 'bg-slate-200 text-slate-800';
            break;
    }

    return (
        <div className="p-4 bg-white rounded-2xl shadow-xl border-4 border-orange-500 ring-4 ring-yellow-400">
            <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
                <AircraftIcon className="w-6 h-6 mr-2" />
                AI-Optimized Air-Ground Coordination
            </h3>
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
                    <div className="bg-slate-100 p-3 rounded-md border border-slate-200 space-y-2">
                        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                        <div className="h-6 bg-slate-200 rounded w-1/2"></div>
                    </div>
                    <div className="bg-slate-100 p-3 rounded-md border border-slate-200 space-y-2">
                        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                        <div className="h-6 bg-slate-200 rounded w-full"></div>
                    </div>
                    <div className="bg-slate-100 p-3 rounded-md border border-slate-200 space-y-2">
                        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                        <div className="h-6 bg-slate-200 rounded w-2/3"></div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-50 p-3 rounded-md border border-slate-200">
                        <p className="text-sm font-semibold text-blue-600">Commandable Asset Status</p>
                        <p className={`text-md font-bold px-2 py-1 rounded-full text-center mt-1 ${statusColor} capitalize`}>{statusText.replace(/-/g, ' ')}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-md border border-slate-200">
                        <p className="text-sm font-semibold text-slate-500">AI-Optimal Drop Zone</p>
                        {dropZone ? (
                            <p className="text-md font-bold text-sky-600 mt-1">{dropZone.lat.toFixed(4)}, {dropZone.lng.toFixed(4)}</p>
                        ) : (
                            <p className="text-md font-bold text-slate-600 mt-1">Mission Complete</p>
                        )}
                    </div>
                    <div className="bg-slate-50 p-3 rounded-md border border-slate-200">
                        <p className="text-sm font-semibold text-slate-500">Protection Target</p>
                        <p className="text-md font-bold text-blue-600 mt-1">Highest-Risk Cluster</p>
                    </div>
                </div>
            )}
        </div>
    );
}

function Step6_AirOpsView() {
  const [aircrafts, setAircrafts] = useState<Aircraft[]>(() => 
    AIRCRAFT_FLEET_CONFIG.map(config => ({
        ...config,
        lat: config.path[0].lat,
        lng: config.path[0].lng,
        progress: 0,
    }))
  );
  const [dropZone, setDropZone] = useState<{ lat: number; lng: number } | null>(null);
  const [isDropZoneLoading, setIsDropZoneLoading] = useState(true);
  const [commandSent, setCommandSent] = useState(false);
  const [dropAnimationPosition, setDropAnimationPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [acknowledgementPulsePosition, setAcknowledgementPulsePosition] = useState<{ lat: number; lng: number } | null>(null);
  
  const commandableTanker = aircrafts.find(a => a.id === 101) || null;

  // High-performance animation loop for aircraft
  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      setAircrafts(prevAircrafts =>
        prevAircrafts.map(ac => {
            if (!ac.path || ac.path.length < 2 || ac.status === 'standby') return ac;
            
            let newProgress = ac.progress + ac.speed;
            
            if (newProgress >= 1) {
                // For 'en-route' planes, they stop at the end of their path.
                newProgress = 1;
            }

            const lat = ac.path[0].lat + (ac.path[1].lat - ac.path[0].lat) * newProgress;
            const lng = ac.path[0].lng + (ac.path[1].lng - ac.path[0].lng) * newProgress;
            
            return { ...ac, lat, lng, progress: newProgress };
        })
      );
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // AI calculation and simulation setup effect (runs once on mount)
  useEffect(() => {
    let isMounted = true;
    
    const runAICalculation = async () => {
        if (!isMounted) return;

        setIsDropZoneLoading(true);
        
        const simulatedEnRouteDots: Omit<Dot, 'path' | 'progress' | 'speed'>[] = Array.from({ length: 57 }, (_, i) => {
          const lat = EVAC_ZONE_BOUNDS.south + Math.random() * (EVAC_ZONE_BOUNDS.north - EVAC_ZONE_BOUNDS.south);
          const lng = EVAC_ZONE_BOUNDS.west + Math.random() * (EVAC_ZONE_BOUNDS.east - EVAC_ZONE_BOUNDS.west);
          return { id: i, lat, lng, status: 'orange' };
        });
        
        const fireCenter = { lat: 34.045, lng: -118.680 };
        const zone = await getOptimalDropZone(simulatedEnRouteDots as Dot[], fireCenter);

        if (isMounted && zone) {
            setDropZone(zone);
        }
        if (isMounted) setIsDropZoneLoading(false);
    };

    runAICalculation();
    return () => { isMounted = false; };
  }, []);

  const handleSendMessage = () => {
      const tanker = aircrafts.find(a => a.id === 101);
      if (!tanker || !dropZone) return;

      setCommandSent(true);
      setAcknowledgementPulsePosition({ lat: tanker.lat, lng: tanker.lng });
      
      const currentPos = { lat: tanker.lat, lng: tanker.lng };
      const newPath = [currentPos, dropZone];
      
      const dist = Math.sqrt(Math.pow(newPath[1].lat - newPath[0].lat, 2) + Math.pow(newPath[1].lng - newPath[0].lng, 2));
      const speed = 0.0025;
      const timeToTarget = (dist / speed) * (1000 / 60);

      setAircrafts(prev => prev.map(ac => 
          ac.id === 101 ? { ...ac, path: newPath, progress: 0, speed, status: 'en-route' } : ac
      ));

      setTimeout(() => {
          // Trigger the animation at the dropZone coordinates
          setDropAnimationPosition(dropZone);
          // Hide the target marker
          setDropZone(null);
          
          // After a small delay for the animation to start, the tanker returns.
          setTimeout(() => {
              setAircrafts(prev => {
                  const currentTanker = prev.find(a => a.id === 101);
                  if (!currentTanker) return prev;
                  const returnPath = [{ lat: currentTanker.lat, lng: currentTanker.lng }, AIRCRAFT_FLEET_CONFIG[0].path[0]];
                  return prev.map(ac => 
                      ac.id === 101 ? { ...ac, path: returnPath, progress: 0, speed: 0.001, status: 'returning-to-base' } : ac
                  );
              });
          }, 500);

      }, timeToTarget);
  };

  return (
    <div className="w-full animate-fade-in-fast">
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl border-4 border-orange-500 ring-4 ring-yellow-400">
        <h2 className="text-lg sm:text-xl font-bold text-slate-800"><span className="text-orange-600">FIREWISER</span> Air Operations Command</h2>
        <p className="text-slate-500 mt-1">Coordinate aerial assets using AI-driven target acquisition for maximum impact.</p>
        
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="w-full h-full">
            <Map 
              userDot={true} 
              aircrafts={aircrafts} 
              optimalDropZone={dropZone} 
              dropAnimationPosition={dropAnimationPosition}
              acknowledgementPulsePosition={acknowledgementPulsePosition}
            />
          </div>
          <div className="flex flex-col space-y-6">
            <AirOpsCard aircraft={commandableTanker} dropZone={dropZone} isLoading={isDropZoneLoading} />
            <CommandExecutionTerminal
                onSendCommand={handleSendMessage}
                optimalDropZone={dropZone}
                disabled={commandSent}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step6_AirOpsView;
