'use client';

import React, { useState } from 'react';

// Function to generate a random attribute value between 1 and 100
const randomAttribute = () => Math.floor(Math.random() * 100) + 1;

interface CharacterFormProps {
  onCreate: (character: any) => void;
}

export default function CharacterForm({ onCreate }: CharacterFormProps) {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('Male');
  const [country, setCountry] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const character = {
      name,
      gender,
      country,
      age: 0,
      attributes: {
        looks: randomAttribute(),
        intelligence: randomAttribute(),
        health: randomAttribute(),
        happiness: randomAttribute(),
        wealth: 0,
      },
      eventLog: [],
    };
    onCreate(character);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Create Your Character</h2>
      <div style={{ marginBottom: '1rem' }}>
        <label>Name: </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Gender: </label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Starting Country: </label>
        <input
          type="text"
          required
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Enter your country"
        />
      </div>
      <button type="submit">Start Life</button>
    </form>
  );
}