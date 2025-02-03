'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type Character = {
  name: string;
  age: number;
  country: string;
  stats: {
    happiness: number;
    health: number;
    intelligence: number;
    looks: number;
    money: number;
  };
  education: string[];
  career?: {
    job: string;
    salary: number;
  };
  relationships: string[];
};

type LifeEvent = {
  age: number;
  description: string;
  type: 'positive' | 'negative' | 'neutral';
};

const COUNTRIES = [
  'United States', 'United Kingdom', 'Canada', 
  'Australia', 'Germany', 'Japan', 'Brazil'
];

const CAREERS = {
  'High School': [],
  'Community College': [
    'Retail Worker', 'Office Assistant', 'Technician', 
    'Sales Representative', 'Nurse'
  ],
  'University': [
    'Software Engineer', 'Doctor', 'Lawyer', 
    'Teacher', 'Accountant', 'Scientist'
  ],
  'Graduate School': [
    'Surgeon', 'University Professor', 'Research Scientist', 
    'Corporate Lawyer', 'Specialized Consultant'
  ]
};

const KowLife: React.FC = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [lifeEvents, setLifeEvents] = useState<LifeEvent[]>([]);
  const [activeMenu, setActiveMenu] = useState<'life' | 'stats' | 'relationships' | 'activities'>('life');
  const [eventPopup, setEventPopup] = useState<LifeEvent | null>(null);
  const [educationModal, setEducationModal] = useState(false);
  const [careerModal, setCareerModal] = useState(false);

  const createCharacter = () => {
    const newCharacter: Character = {
      name: generateName(),
      age: 0,
      country: COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)],
      stats: {
        happiness: 50,
        health: 100,
        intelligence: 50,
        looks: 50,
        money: 0
      },
      education: [],
      relationships: []
    };
    setCharacter(newCharacter);
    addLifeEvent({
      age: 0,
      description: `You were born in ${newCharacter.country}!`,
      type: 'neutral'
    });
  };

  const generateName = (): string => {
    const firstNames = ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia'];
    return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  };

  const addLifeEvent = (event: LifeEvent) => {
    setLifeEvents(prev => [event, ...prev]);
    setEventPopup(event);
  };

  const progressYear = () => {
    if (!character) return;

    const updatedCharacter = { ...character };
    updatedCharacter.age += 1;

    // Random life events
    const randomEvents = [
      { 
        description: 'You made a new friend!', 
        type: 'positive' as const,
        statChanges: { happiness: 10 }
      },
      { 
        description: 'You caught a minor illness.', 
        type: 'negative' as const,
        statChanges: { health: -10 }
      },
      { 
        description: 'You learned something new!', 
        type: 'positive' as const,
        statChanges: { intelligence: 5 }
      }
    ];

    const event = randomEvents[Math.floor(Math.random() * randomEvents.length)];
    
    // Apply stat changes
    Object.entries(event.statChanges).forEach(([stat, change]) => {
      updatedCharacter.stats[stat] = Math.max(0, Math.min(100, 
        updatedCharacter.stats[stat] + change
      ));
    });

    // Education milestones
    if (updatedCharacter.age === 6) {
      addLifeEvent({
        age: updatedCharacter.age,
        description: 'You started elementary school!',
        type: 'neutral'
      });
    }
    if (updatedCharacter.age === 14) {
      addLifeEvent({
        age: updatedCharacter.age,
        description: 'You entered high school!',
        type: 'neutral'
      });
      updatedCharacter.education.push('High School');
    }

    setCharacter(updatedCharacter);
    addLifeEvent({
      age: updatedCharacter.age,
      description: event.description,
      type: event.type
    });
  };

  const selectEducation = (education: string) => {
    if (!character) return;
    const updatedCharacter = { ...character };
    updatedCharacter.education.push(education);
    setCharacter(updatedCharacter);
    setEducationModal(false);
  };

  const selectCareer = (career: string) => {
    if (!character) return;
    const updatedCharacter = { 
      ...character, 
      career: { 
        job: career, 
        salary: Math.floor(Math.random() * 50000) + 30000 
      } 
    };
    setCharacter(updatedCharacter);
    setCareerModal(false);
  };

  if (!character) {
    return (
      <div className="h-screen bg-gray-100 flex items-center justify-center">
        <Button onClick={createCharacter} className="text-xl p-6">
          Start New Life
        </Button>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Event Popup */}
      {eventPopup && (
        <Dialog open={!!eventPopup} onOpenChange={() => setEventPopup(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Life Event</DialogTitle>
            </DialogHeader>
            <div className={`p-4 ${
              eventPopup.type === 'positive' ? 'bg-green-100' : 
              eventPopup.type === 'negative' ? 'bg-red-100' : 'bg-gray-100'
            }`}>
              <p>{eventPopup.description}</p>
            </div>
            <Button onClick={() => setEventPopup(null)}>Close</Button>
          </DialogContent>
        </Dialog>
      )}

      {/* Main Content Area */}
      <div className="flex-grow overflow-y-auto p-4">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold">{character.name}</h2>
          <p>Age: {character.age} | {character.country}</p>
        </div>

        {/* Life Log */}
        <div className="bg-gray-100 rounded-lg p-2 max-h-[60vh] overflow-y-auto">
          {lifeEvents.map((event, index) => (
            <div 
              key={index} 
              className={`p-2 border-b ${
                event.type === 'positive' ? 'bg-green-50' : 
                event.type === 'negative' ? 'bg-red-50' : 'bg-gray-50'
              }`}
            >
              Age {event.age}: {event.description}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Menu */}
      <div className="bg-gray-200 p-2">
        {/* Stats Display */}
        <div className="flex justify-between mb-2 text-sm">
          <span>💗 {character.stats.health}</span>
          <span>😊 {character.stats.happiness}</span>
          <span>🧠 {character.stats.intelligence}</span>
          <span>💰 ${character.stats.money}</span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-4 gap-2 mb-2">
          <Button 
            variant="outline"
            onClick={() => setEducationModal(true)}
          >
            Education
          </Button>
          <Button 
            variant="outline"
            onClick={() => setCareerModal(true)}
          >
            Career
          </Button>
          <Button variant="outline">Relationships</Button>
          <Button variant="outline">Assets</Button>
        </div>

        {/* Year Progress Button */}
        <Button 
          className="w-full" 
          onClick={progressYear}
        >
          Age Up
        </Button>
      </div>

      {/* Education Modal */}
      {educationModal && (
        <Dialog open={educationModal} onOpenChange={() => setEducationModal(false)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Choose Education</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              {Object.keys(CAREERS)
                .filter(edu => !character.education.includes(edu))
                .map(education => (
                  <Button 
                    key={education} 
                    className="w-full"
                    onClick={() => selectEducation(education)}
                  >
                    {education}
                  </Button>
                ))}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Career Modal */}
      {careerModal && (
        <Dialog open={careerModal} onOpenChange={() => setCareerModal(false)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Choose Career</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              {character.education.length > 0 && 
                CAREERS[character.education[character.education.length - 1] as keyof typeof CAREERS].map(career => (
                  <Button 
                    key={career} 
                    className="w-full"
                    onClick={() => selectCareer(career)}
                  >
                    {career}
                  </Button>
                ))
              }
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default KowLife;