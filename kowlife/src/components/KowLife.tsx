// components/KowLife.tsx
'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Types
export type Character = {
  id: string;
  name: string;
  age: number;
  health: number;
  happiness: number;
  intelligence: number;
  wealth: number;
  country: string;
  career?: string;
  education?: string;
  relationships: Relationship[];
  inventory: string[];
};

type Relationship = {
  name: string;
  type: 'Family' | 'Friend' | 'Romantic';
  closeness: number;
};

const COUNTRIES = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 
  'Japan', 'Brazil', 'India', 'China', 'France'
];

const CAREERS = [
  'Student', 'Doctor', 'Teacher', 'Engineer', 'Lawyer', 
  'Entrepreneur', 'Artist', 'Scientist', 'Police Officer', 'Programmer'
];

const EDUCATION_PATHS = [
  'High School', 'Community College', 'University', 'Graduate School'
];

const KowLife: React.FC = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [gameLog, setGameLog] = useState<string[]>([]);

  const generateRandomName = (): string => {
    const firstNames = ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason', 'Isabella', 'William'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    
    return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  };

  const createCharacter = () => {
    const newCharacter: Character = {
      id: Date.now().toString(),
      name: generateRandomName(),
      age: 0,
      health: 100,
      happiness: 50,
      intelligence: 50,
      wealth: 0,
      country: COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)],
      relationships: [],
      inventory: []
    };
    setCharacter(newCharacter);
    addGameLog(`New life begins for ${newCharacter.name} in ${newCharacter.country}`);
  };

  const addGameLog = (message: string) => {
    setGameLog(prev => [message, ...prev].slice(0, 10));
  };

  const progressAge = () => {
    if (!character) return;

    const updatedCharacter = { ...character };
    updatedCharacter.age += 1;

    // Random life events
    if (Math.random() < 0.2) {
      const events = [
        'Found a lucky coin',
        'Got a minor injury',
        'Made a new friend',
        'Learned a new skill',
        'Experienced a setback'
      ];
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      addGameLog(randomEvent);

      updatedCharacter.happiness += Math.floor(Math.random() * 10) - 5;
      updatedCharacter.health -= Math.floor(Math.random() * 5);
      updatedCharacter.intelligence += Math.floor(Math.random() * 5);
    }

    // Career and education progression
    if (updatedCharacter.age === 18 && !updatedCharacter.education) {
      updatedCharacter.education = 'High School';
      addGameLog('Graduated High School');
    }

    // Ensure stats stay within bounds
    updatedCharacter.happiness = Math.max(0, Math.min(100, updatedCharacter.happiness));
    updatedCharacter.health = Math.max(0, Math.min(100, updatedCharacter.health));
    updatedCharacter.intelligence = Math.max(0, Math.min(100, updatedCharacter.intelligence));

    setCharacter(updatedCharacter);
  };

  const chooseCareer = (career: string) => {
    if (!character) return;
    const updatedCharacter = { ...character, career };
    setCharacter(updatedCharacter);
    addGameLog(`Chose career as ${career}`);
  };

  if (!character) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Welcome to KowLife</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={createCharacter} className="w-full">
              Start New Life
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>KowLife: {character.name}'s Journey</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-xl font-bold">Character Details</h2>
              <p>Name: {character.name}</p>
              <p>Age: {character.age}</p>
              <p>Country: {character.country}</p>
              {character.career && <p>Career: {character.career}</p>}
              {character.education && <p>Education: {character.education}</p>}
            </div>
            <div>
              <h3 className="text-lg font-semibold">Stats</h3>
              <div className="space-y-2">
                <div>
                  <span>Health:</span>
                  <Progress value={character.health} className="mt-1" />
                </div>
                <div>
                  <span>Happiness:</span>
                  <Progress value={character.happiness} className="mt-1" />
                </div>
                <div>
                  <span>Intelligence:</span>
                  <Progress value={character.intelligence} className="mt-1" />
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="actions" className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="actions">Actions</TabsTrigger>
              <TabsTrigger value="career">Career</TabsTrigger>
              <TabsTrigger value="log">Game Log</TabsTrigger>
            </TabsList>
            <TabsContent value="actions">
              <Button onClick={progressAge} className="w-full">
                Progress to Next Year
              </Button>
            </TabsContent>
            <TabsContent value="career">
              <div className="grid grid-cols-2 gap-2">
                {CAREERS.map((career) => (
                  <Button 
                    key={career} 
                    onClick={() => chooseCareer(career)}
                    variant="outline"
                  >
                    {career}
                  </Button>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="log">
              <div className="bg-gray-100 p-4 rounded-md max-h-48 overflow-y-auto">
                <h3 className="font-bold mb-2">Life Events</h3>
                {gameLog.map((log, index) => (
                  <div key={index} className="text-sm border-b py-1">
                    {log}
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default KowLife;