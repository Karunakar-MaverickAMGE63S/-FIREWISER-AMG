import React, { useState, useEffect } from 'react';
import type { WiseOutput, AirQualityData } from '../types';
import Button from './common/Button';
import { HeartIcon, WindIcon } from '../constants';
import { initializeChromeAI, summarizeText, rephraseForUrgency, ChromeAIStatus } from '../services/chromeAiService';

interface Step4aChecklistProps {
  output: WiseOutput;
  airQualityData: AirQualityData | null;
  onNext: () => void;
}

const getAqiRgbColor = (aqi: number): string => {
    if (aqi <= 50) return 'rgb(76, 175, 80)';   // Green
    if (aqi <= 100) return 'rgb(255, 235, 59)'; // Yellow
    if (aqi <= 150) return 'rgb(255, 152, 0)';  // Orange
    if (aqi <= 200) return 'rgb(244, 67, 54)';   // Red
    if (aqi <= 300) return 'rgb(156, 39, 176)';  // Purple
    return 'rgb(121, 85, 72)';    // Maroon
};

const getAqiAdvice = (aqi: number) => {
    if (aqi <= 50) return "Air quality is satisfactory, posing minimal risk.";
    if (aqi <= 100) return "Individuals with respiratory sensitivity should limit prolonged outdoor exertion.";
    if (aqi <= 150) return "At-risk groups (e.g., heart/lung disease, elderly) should reduce heavy outdoor exertion.";
    if (aqi <= 200) return "Health Advisory: Avoid prolonged outdoor exertion. N95 mask use is recommended for at-risk individuals.";
    return "Hazardous Conditions: Remain indoors with windows closed. Utilize air purifiers if accessible.";
}

function AirQualityCard({ data }: { data: AirQualityData }) {
    const aqiColor = getAqiRgbColor(data.aqi);
    const advice = getAqiAdvice(data.aqi);

    return (
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl border-4 border-green-600 ring-4 ring-yellow-400">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center"><WindIcon /> <span className="ml-2">Current Air Quality</span></h3>
            <div className="text-center mb-4">
                <p className="text-6xl font-extrabold text-blue-600">{data.aqi}</p>
                <p className="text-lg font-semibold" style={{ color: aqiColor }}>{data.category}</p>
                <p className="text-sm text-slate-500 mt-1">Dominant Pollutant: {data.dominantPollutant.toUpperCase()}</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600">
                <p><span className="font-bold">Recommendation:</span> {advice}</p>
            </div>
        </div>
    );
}

function SummaryCard({ summary }: { summary: string | null }) {
  if (!summary) return null;
  
  const summaryPoints = summary
    .split('\n')
    .map(s => s.trim().replace(/^\*/, '').trim())
    .filter(Boolean);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl border-4 border-blue-500 ring-4 ring-yellow-400">
      <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 mr-2 text-blue-500"><path fillRule="evenodd" d="M15.994 4.006a1 1 0 0 0-1.414 0L5 13.586l-1.58-1.58a1 1 0 0 0-1.414 1.414l2.286 2.286a1 1 0 0 0 1.414 0L15.994 5.42A1 1 0 0 0 15.994 4.006Z" clipRule="evenodd" /></svg>
        <span className="text-blue-600">Key Actions (On-Device AI Summary)</span>
      </h3>
      {summaryPoints.length > 0 ? (
        <ul className="space-y-2">
          {summaryPoints.map((point, index) => (
            <li key={index} className="flex items-start text-slate-700 font-semibold">
              <span className="mr-2 text-blue-500 font-bold">&bull;</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      ) : (
         <p className="text-slate-600">{summary}</p>
      )}
       <p className="text-xs text-slate-400 mt-3 text-right">Generated instantly on your device.</p>
    </div>
  );
}

function Step4a_Checklist({ output, airQualityData, onNext }: Step4aChecklistProps) {
  const [aiStatus, setAiStatus] = useState<ChromeAIStatus>(ChromeAIStatus.UNSUPPORTED);
  const [summary, setSummary] = useState<string | null>(null);
  const [rephrasedItems, setRephrasedItems] = useState<Map<number, string>>(new Map());
  const [rephrasingIndex, setRephrasingIndex] = useState<number | null>(null);
  const coachMessage = output.psychological_coaching_messages[0] || "Stay calm and follow your plan.";

  useEffect(() => {
    initializeChromeAI().then(setAiStatus);
  }, []);

  useEffect(() => {
    if (aiStatus === ChromeAIStatus.SUPPORTED && output) {
      const coachMessages = output.psychological_coaching_messages.join(' ');
      const checklistItems = output.evacuation_checklist.map(i => i.item).join('. ');
      const textToSummarize = `Stay Calm, Stay Focused. ${coachMessages} ${checklistItems}`;
      summarizeText(textToSummarize).then(setSummary);
    }
  }, [aiStatus, output]);
  
  const handleRephrase = async (text: string, index: number) => {
    if (aiStatus !== ChromeAIStatus.SUPPORTED) return;
    setRephrasingIndex(index);
    const rephrased = await rephraseForUrgency(text);
    setRephrasedItems(prev => new Map(prev).set(index, rephrased));
    setRephrasingIndex(null);
  };

  return (
    <div className="w-full space-y-6 animate-fade-in">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Part 1: Role-Based Checklist */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl border-4 border-orange-500 ring-4 ring-yellow-400">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-orange-500 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            <span className="ml-2">Evacuation Checklist for: {output.profile}</span>
          </h3>
          <ul className="space-y-3">
            {output.evacuation_checklist.map((checklistItem, index) => (
              <li key={index} className="flex items-start group">
                 <div className="flex-shrink-0 w-8 h-8 mr-3 mt-0.5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm border-2 border-blue-300">
                    {checklistItem.priority}
                 </div>
                <span className="text-blue-800 font-semibold flex-grow pt-1">{rephrasedItems.get(index) || checklistItem.item}</span>
                 {aiStatus === ChromeAIStatus.SUPPORTED && (
                   <button
                     onClick={() => handleRephrase(checklistItem.item, index)}
                     disabled={rephrasingIndex === index}
                     className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 rounded-full p-1 hover:bg-blue-100 disabled:opacity-50"
                     title="Rephrase for urgency (On-Device AI)"
                   >
                     {rephrasingIndex === index ? (
                       <svg className="w-5 h-5 text-blue-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                       </svg>
                     ) : (
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-blue-500">
                         <path d="M10 3a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 3ZM10 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 15ZM10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM5.334 6.75a.75.75 0 0 0 0 1.06l.8.8a2.98 2.98 0 0 0-1.292 2.39.75.75 0 0 0 1.5 0 1.48 1.48 0 0 1 .646-1.192l.8.8a.75.75 0 0 0 1.06-1.06l-4.5-4.5a.75.75 0 0 0-1.06 0Z M15.728 12.44a.75.75 0 0 0-1.06 1.06l-.8-.8a1.48 1.48 0 0 1-.646 1.192.75.75 0 1 0-.866 1.298 2.98 2.98 0 0 0 3.652-3.652l-.8-.8a.75.75 0 0 0-1.06-1.06l.522.522Z" />
                       </svg>
                     )}
                   </button>
                 )}
              </li>
            ))}
          </ul>
        </div>

        {/* Part 2: Air Quality & Mental Coach */}
        <div className="space-y-6">
            {summary && <SummaryCard summary={summary} />}
            {airQualityData && <AirQualityCard data={airQualityData} />}

            <div className="bg-orange-500 text-white p-4 sm:p-6 rounded-2xl shadow-xl border-4 border-orange-600 ring-4 ring-yellow-400">
                <h3 className="text-xl font-bold mb-4 flex items-center"><HeartIcon /> <span className="ml-2">Stay Calm, Stay Focused</span></h3>
                <p className="text-orange-100">{coachMessage}</p>
            </div>
        </div>
      </div>
      
      <div className="pt-4">
        <Button onClick={onNext} variant="secondary">
          Switch to Command View &rarr;
        </Button>
      </div>
    </div>
  );
}

export default Step4a_Checklist;
