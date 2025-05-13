import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface QueuePerson {
  id: string;
  name: string;
  position: number;
  estimatedWaitTime: number;
  isCurrentUser: boolean;
  isNextAvailable?: boolean;
}

interface LiveQueueProps {
  currentNumber: number;
  totalInQueue: number;
  estimatedWaitTime: number;
  userPosition?: number;
  showNextAvailable?: boolean;
}

export const LiveQueue: React.FC<LiveQueueProps> = ({
  currentNumber,
  totalInQueue,
  estimatedWaitTime,
  userPosition,
  showNextAvailable = true,
}) => {
  const [queuePeople, setQueuePeople] = useState<QueuePerson[]>([]);

  useEffect(() => {
    // Generate sample queue data
    const generateQueue = () => {
      const people: QueuePerson[] = [];
      let userInQueue = false;
      for (let i = 0; i < totalInQueue; i++) {
        const position = currentNumber + i;
        const isCurrentUser = userPosition === position;
        if (isCurrentUser) userInQueue = true;
        people.push({
          id: `person-${i}`,
          name: `Patient ${position}`,
          position: position,
          estimatedWaitTime: Math.max(0, estimatedWaitTime - (i * 5)),
          isCurrentUser,
        });
      }
      // Highlight next available spot if user is not in queue
      if (showNextAvailable && !userInQueue) {
        people.push({
          id: `next-available`,
          name: 'You (Next)',
          position: currentNumber + totalInQueue,
          estimatedWaitTime: Math.max(0, estimatedWaitTime - (totalInQueue * 5)),
          isCurrentUser: false,
          isNextAvailable: true,
        });
      }
      setQueuePeople(people);
    };
    generateQueue();
  }, [currentNumber, totalInQueue, estimatedWaitTime, userPosition, showNextAvailable]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Live Queue Status</span>
          <Badge variant="secondary" className="ml-2">
            {totalInQueue} in queue
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Current Number: {currentNumber}</span>
            <span>Est. Wait: {estimatedWaitTime} mins</span>
          </div>

          <div className="relative w-full overflow-x-auto rounded-lg bg-muted/20 p-4">
            <div className="flex items-center min-w-max gap-6">
              {queuePeople.map((person, index) => (
                <motion.div
                  key={person.id}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.08 }}
                  className={`relative flex flex-col items-center ${
                    person.isCurrentUser
                      ? 'z-10 scale-110'
                      : person.isNextAvailable
                        ? 'z-10 scale-105'
                        : 'z-0'
                  }`}
                >
                  <motion.div
                    className={`relative flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300
                      ${person.isCurrentUser
                        ? 'bg-primary text-primary-foreground border-primary shadow-lg'
                        : person.isNextAvailable
                          ? 'bg-[#e0f7fa] text-[#00796b] border-[#00bfae] animate-pulse'
                          : 'bg-muted border-muted-foreground'}
                    `}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-sm font-medium">
                      {person.position}
                    </span>
                    {person.isCurrentUser && (
                      <motion.div
                        className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-primary"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [1, 0.5, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                    {person.isNextAvailable && (
                      <motion.div
                        className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-[#00bfae]"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [1, 0.5, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                  </motion.div>
                  <div className="mt-2 whitespace-nowrap text-xs">
                    {person.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {person.estimatedWaitTime} mins
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-primary"></div>
              <span>Your Position</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-[#00bfae]"></div>
              <span>Next Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-muted"></div>
              <span>Others</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 