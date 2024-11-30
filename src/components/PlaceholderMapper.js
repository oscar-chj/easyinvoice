import React, { useState, useEffect } from 'react';
import { findPlaceholders } from '../utils/excelUtils';

function PlaceholderMapper({ templateData, setPlaceholders, setFieldMappings }) {
  const [mappings, setMappings] = useState({});
  const [placeholderList, setPlaceholderList] = useState([]);

  useEffect(() => {
    const detectedPlaceholders = findPlaceholders(templateData);
    setPlaceholders(detectedPlaceholders);
    setPlaceholderList(detectedPlaceholders);
    const initialMappings = {};
    detectedPlaceholders.forEach((placeholder) => {
      initialMappings[placeholder] = '';
    });
    setMappings(initialMappings);
  }, [templateData, setPlaceholders]);

  const handleMappingChange = (placeholder, value) => {
    setMappings((prev) => ({
      ...prev,
      [placeholder]: value,
    }));
  };

  const handleAddPlaceholder = () => {
    const newPlaceholder = prompt('Enter a new placeholder (e.g., {{new_field}}):');
    if (!newPlaceholder) return; // Exit if user cancels the prompt
  
    if (newPlaceholder.startsWith('{{') && newPlaceholder.endsWith('}}')) {
      const trimmedPlaceholder = newPlaceholder.slice(2, -2);
      if (!placeholderList.includes(trimmedPlaceholder)) {
        setPlaceholderList((prev) => [...prev, trimmedPlaceholder]);
        setMappings((prev) => ({ ...prev, [trimmedPlaceholder]: '' }));
      } else {
        alert('Placeholder already exists.');
      }
    } else {
      alert('Invalid placeholder format. Use {{placeholder_name}}.');
    }
  };
  
  const handleEditPlaceholder = (oldPlaceholder) => {
    const newPlaceholder = prompt(
      `Edit placeholder "${oldPlaceholder}" (e.g., {{new_field}}):`,
      `{{${oldPlaceholder}}}`
    );
    if (!newPlaceholder) return; // Exit if user cancels the prompt
  
    if (newPlaceholder.startsWith('{{') && newPlaceholder.endsWith('}}')) {
      const trimmedPlaceholder = newPlaceholder.slice(2, -2);
      if (!placeholderList.includes(trimmedPlaceholder) || oldPlaceholder === trimmedPlaceholder) {
        setPlaceholderList((prev) =>
          prev.map((placeholder) => (placeholder === oldPlaceholder ? trimmedPlaceholder : placeholder))
        );
        setMappings((prev) => {
          const updatedMappings = { ...prev };
          updatedMappings[trimmedPlaceholder] = updatedMappings[oldPlaceholder];
          delete updatedMappings[oldPlaceholder];
          return updatedMappings;
        });
      } else {
        alert('Placeholder already exists.');
      }
    } else {
      alert('Invalid placeholder format. Use {{placeholder_name}}.');
    }
  };  

  const handleRemovePlaceholder = (placeholder) => {
    setPlaceholderList((prev) => prev.filter((item) => item !== placeholder));
    setMappings((prev) => {
      const updatedMappings = { ...prev };
      delete updatedMappings[placeholder];
      return updatedMappings;
    });
  };

  const handleSubmit = () => {
    setFieldMappings(mappings);
  };

  return (
    <div>
      {placeholderList.map((placeholder) => (
        <div key={placeholder}>
          <label>
            Placeholder: <b>{`{{${placeholder}}}`}</b>
          </label>
          <input
            type="text"
            placeholder="Field Name"
            value={mappings[placeholder]}
            onChange={(e) => handleMappingChange(placeholder, e.target.value)}
          />
          <button onClick={() => handleEditPlaceholder(placeholder)}>Edit</button>
          <button onClick={() => handleRemovePlaceholder(placeholder)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddPlaceholder}>Add Placeholder</button>
      <button onClick={handleSubmit}>Proceed to Data Input</button>
    </div>
  );
}

export default PlaceholderMapper;
