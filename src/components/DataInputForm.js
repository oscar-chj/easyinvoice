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
        console.log('Invoice data submitted:', formData);
    };

    // Ensure unique fields are displayed
    const uniqueFields = Array.from(new Set(Object.values(fieldMappings).filter(Boolean)));

    return (
        <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '10px' }}>
                {uniqueFields.map((fieldName) => (
                    <React.Fragment key={fieldName}>
                        <span style={{ textAlign: 'right', fontWeight: 'bold' }}>{fieldName}:</span>
                        <input
                            type="text"
                            value={formData[fieldName] || ''}
                            onChange={(e) => handleChange(fieldName, e.target.value)}
                            style={{
                                width: '100%',
                                textAlign: 'left',
                                padding: '5px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                            }}
                        />
                    </React.Fragment>
                ))}
            </div>
            <button onClick={handleSubmit} style={{ marginTop: '20px' }}>
                Generate PDF
            </button>
        </div>
    );
}

export default DataInputForm;
