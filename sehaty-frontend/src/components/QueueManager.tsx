import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";

interface QueueItem {
  id: number;
  patientName: string;
  time: string;
  status: "waiting" | "current" | "completed" | "noShow";
  estimatedWait?: number; // in minutes
}

const mockQueue: QueueItem[] = [
  { id: 1, patientName: "Ahmed Mohamed", time: "9:00 AM", status: "completed" },
  { id: 2, patientName: "Sarah Ibrahim", time: "9:30 AM", status: "completed" },
  { id: 3, patientName: "Test User", time: "10:00 AM", status: "current", estimatedWait: 0 },
  { id: 4, patientName: "Mahmoud Ali", time: "10:30 AM", status: "waiting", estimatedWait: 15 },
  { id: 5, patientName: "Fatima Ahmed", time: "11:00 AM", status: "waiting", estimatedWait: 45 },
  { id: 6, patientName: "Omar Hassan", time: "11:30 AM", status: "waiting", estimatedWait: 75 },
];

export const QueueManager: React.FC = () => {
  const [queue, setQueue] = useState<QueueItem[]>(mockQueue);

  // Simulate queue updates
  useEffect(() => {
    const intervalId = setInterval(() => {
      setQueue(prev => {
        // Find the current patient
        const currentIndex = prev.findIndex(p => p.status === "current");
        if (currentIndex === -1 || currentIndex === prev.length - 1) return prev;

        // Create a copy of the queue
        const newQueue = [...prev];
        
        // Mark current as completed
        newQueue[currentIndex] = { ...newQueue[currentIndex], status: "completed" };
        
        // Make next patient current
        newQueue[currentIndex + 1] = { ...newQueue[currentIndex + 1], status: "current", estimatedWait: 0 };
        
        // Update estimated wait times
        for (let i = currentIndex + 2; i < newQueue.length; i++) {
          newQueue[i] = { 
            ...newQueue[i], 
            estimatedWait: Math.max(0, (newQueue[i].estimatedWait || 30) - 15) 
          };
        }
        
        return newQueue;
      });
    }, 15000); // Update every 15 seconds

    return () => clearInterval(intervalId);
  }, []);

  const findUserPosition = () => {
    const userIndex = queue.findIndex(p => p.patientName === "Test User");
    if (userIndex === -1) return null;
    
    if (queue[userIndex].status === "current") {
      return { position: "current", wait: 0 };
    } else if (queue[userIndex].status === "waiting") {
      return { 
        position: userIndex - queue.findIndex(p => p.status === "current"), 
        wait: queue[userIndex].estimatedWait
      };
    } else {
      return { position: "completed", wait: 0 };
    }
  };

  const userPosition = findUserPosition();

  return (
    <Card className="relative overflow-hidden border-[#4caf96] dark:border-[#4caf96]">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4caf96] to-green-400"></div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-[#1f4156] dark:text-white text-lg flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-[#4caf96]">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            Live Queue Status
          </h3>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 animate-pulse">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Live
          </div>
        </div>

        {userPosition && (
          <div className={`mb-4 p-3 rounded-md ${
            userPosition.position === "current" 
              ? "bg-[#4caf9620] dark:bg-[#4caf9640] border-l-4 border-[#4caf96]" 
              : userPosition.position === "completed"
                ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500"
                : "bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500"
          }`}>
            <div className="font-medium text-sm text-gray-700 dark:text-gray-300">
              {userPosition.position === "current" ? (
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-[#4caf96]">
                    <path d="M18 6 7 17l-5-5"></path>
                  </svg>
                  It's your turn now! Please proceed to the doctor's office.
                </span>
              ) : userPosition.position === "completed" ? (
                <span>Your appointment has been completed.</span>
              ) : (
                <span>You are number <b>{userPosition.position}</b> in queue. Estimated wait time: <b>{userPosition.wait} minutes</b></span>
              )}
            </div>
          </div>
        )}

        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {queue.map(item => (
            <div 
              key={item.id} 
              className={`flex justify-between items-center p-2 rounded-md text-sm ${
                item.status === "current" 
                  ? "bg-[#4caf9615] dark:bg-[#4caf9630]" 
                  : item.status === "completed"
                    ? "bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400"
                    : "bg-white dark:bg-gray-800"
              } ${item.patientName === "Test User" ? "border border-[#4caf96] dark:border-[#4caf96]" : ""}`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  item.status === "current" 
                    ? "bg-[#4caf96]" 
                    : item.status === "completed"
                      ? "bg-gray-400"
                      : "bg-yellow-500"
                }`}></div>
                <span className={`font-medium ${item.patientName === "Test User" ? "text-[#4caf96]" : ""}`}>
                  {item.patientName === "Test User" ? "You" : item.patientName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>{item.time}</span>
                {item.status === "waiting" && item.estimatedWait !== undefined && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    ~{item.estimatedWait} min wait
                  </span>
                )}
                {item.status === "current" && (
                  <span className="inline-flex items-center rounded-full bg-[#4caf96] px-2 py-0.5 text-xs text-white">
                    Now
                  </span>
                )}
                {item.status === "completed" && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                    <path d="M18 6 7 17l-5-5"></path>
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 animate-fadeIn">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  );
}; 