import React, { useState } from 'react';

function DataInputForm({ fieldMappings, setInvoiceData }) {
  const [formData, setFormData] = useState({});

  const handleChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = () => {
    setInvoiceData(formData);
  };

  return (
    <div>
      {Object.values(fieldMappings).map(
        (fieldName) =>
          fieldName && (
            <div key={fieldName}>
              <label>{fieldName}:</label>
              <input
                type="text"
                value={formData[fieldName] || ''}
                onChange={(e) => handleChange(fieldName, e.target.value)}
              />
            </div>
          )
      )}
      <button onClick={handleSubmit}>Generate PDF</button>
    </div>
  );
}

export default DataInputForm;
