'use client';

import React, { useState } from 'react';
import EventLog from './EventLog';

interface LifeSimulatorProps {
  character: any;
}

// Function to generate a random life event based on age
const generateRandomEvent = (age: number) => {
  const events = [
    { description: 'Went to school.', effect: { happiness: 5 } },
    { description: 'Had a birthday party.', effect: { happiness: 10 } },
    { description: 'Faced a minor accident.', effect: { health: -10, happiness: -5 } },
    { description: 'Won a small lottery.', effect: { wealth: 50, happiness: 15 } },
    { description: 'Gained new knowledge.', effect: { intelligence: 5 } }
    // Extend with more events as needed for your simulation.
  ];
  // Example of an early-life event adjustment
  if (age < 5) {
    return { description: 'Learned something new as a child.', effect: { happiness: 5 } };
  }
  const randomIndex = Math.floor(Math.random() * events.length);
  return events[randomIndex];
};

export default function LifeSimulator({ character }: LifeSimulatorProps) {
  const [currentCharacter, setCurrentCharacter] = useState(character);

  const simulateYear = () => {
    const newAge = currentCharacter.age + 1;
    const event = generateRandomEvent(newAge);

    // Apply event effects to each attribute
    const newAttributes = { ...currentCharacter.attributes };
    for (const key in event.effect) {
      newAttributes[key] = (newAttributes[key] || 0) + event.effect[key];
    }

    // Update the event log with a new event description
    const newEventLog = [
      ...currentCharacter.eventLog,
      `Age ${newAge}: ${event.description}`
    ];

    setCurrentCharacter({
      ...currentCharacter,
      age: newAge,
      attributes: newAttributes,
      eventLog: newEventLog,
    });
  };

  const resetGame = () => {
    // For simplicity, refresh the page to restart
    window.location.reload();
  };

  return (
    <div>
      <h2>Life Simulator</h2>
      <p>
        <strong>Name:</strong> {currentCharacter.name} | <strong>Age:</strong>{' '}
        {currentCharacter.age} | <strong>Country:</strong> {currentCharacter.country}
      </p>
      <div>
        <h3>Attributes:</h3>
        <ul>
          {Object.entries(currentCharacter.attributes).map(([key, value]) => (
            <li key={key}>
              {key}: {value}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ margin: '1rem 0' }}>
        <button onClick={simulateYear} disabled={currentCharacter.age >= 100}>
          Simulate Next Year
        </button>
        <button onClick={resetGame} style={{ marginLeft: '1rem' }}>
          Restart Game
        </button>
      </div>
      <EventLog eventLog={currentCharacter.eventLog} />
    </div>
  );
}