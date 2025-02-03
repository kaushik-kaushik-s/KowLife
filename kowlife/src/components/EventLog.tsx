'use client';

import React from 'react';

interface EventLogProps {
  eventLog: string[];
}

export default function EventLog({ eventLog }: EventLogProps) {
  return (
    <div>
      <h3>Event Log:</h3>
      <ul>
        {eventLog.map((event, index) => (
          <li key={index}>{event}</li>
        ))}
      </ul>
    </div>
  );
}