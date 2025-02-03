'use client';

import { useState } from 'react';
import CharacterForm from '@/components/CharacterForm';
import LifeSimulator from '@/components/LifeSimulator';

export default function Home() {
  const [character, setCharacter] = useState<any>(null);

  const handleCharacterCreation = (data: any) => {
    setCharacter(data);
  };

  return (
    <div>
      {!character ? (
        // Render character creation form if not created yet
        <CharacterForm onCreate={handleCharacterCreation} />
      ) : (
        // Render the life simulator after character creation
        <LifeSimulator character={character} />
      )}
    </div>
  );
}