import React, { useState } from 'react';
import './App.css';

import henryImage from './assets/henry.png';
import jakeImage from './assets/jake.png';
import kristenImage from './assets/kristen.png';
import mimImage from './assets/mim.png';
import seanImage from './assets/sean.jpg';
import willImage from './assets/will.png';

function App() {
  const [selectedName, setSelectedName] = useState<keyof typeof people | ''>('');
  const [time, setTime] = useState('7:00 PM');
  const [note, setNote] = useState('');
  const [familyResponses, setFamilyResponses] = useState<
    { name: keyof typeof people; isHome: boolean; note: string; image: string }[]
  >([]);

  const people = {
    Henry: henryImage,
    Jake: jakeImage,
    Kristen: kristenImage,
    Mim: mimImage,
    Sean: seanImage,
    Will: willImage,
  };

  const handleResponse = (isHome: boolean) => {
    if (!selectedName) return;

    setFamilyResponses((prev) => {
      const existingIndex = prev.findIndex((resp) => resp.name === selectedName);

      const updatedResponse = {
        name: selectedName,
        isHome,
        note,
        image: people[selectedName],
      };

      if (existingIndex !== -1) {
        const updatedResponses = [...prev];
        updatedResponses[existingIndex] = updatedResponse;
        return updatedResponses;
      } else {
        return [...prev, updatedResponse];
      }
    });

    setNote('');
  };

  return (
    <div className="App">
      <h1>
        Will you be home for dinner at{' '}
        <input
          type="text"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="Enter time"
        />
        ?
      </h1>

      <div className="person-response">
        <label htmlFor="familyName">Select a name:</label>
        <select
          id="familyName"
          value={selectedName}
          onChange={(e) => setSelectedName(e.target.value as keyof typeof people)}
        >
          <option value="" disabled>
            -- Select a name --
          </option>
          {Object.keys(people).map((person) => (
            <option key={person} value={person}>
              {person}
            </option>
          ))}
        </select>

        <div className="response-options">
          <div>
            <button onClick={() => handleResponse(true)}>Yes, I’ll be home</button>
            <button onClick={() => handleResponse(false)}>No, I won’t be</button>
          </div>
          <input
            id="note"
            type="text"
            placeholder="Add a note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      </div>

      <div className="responses">
        <h2>Responses</h2>
        {familyResponses.length > 0 && (
          <ul>
            {familyResponses.map((resp, index) => (
              <li key={index} className="response-item">
                <img src={resp.image} alt={resp.name} className="response-image" />
                {resp.isHome ? (
                  <span className="green-check">✔</span>
                ) : (
                  <span className="red-x">✘</span>
                )}{' '}
                {resp.name}
                {resp.note && <span className="note"> - {resp.note}</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
