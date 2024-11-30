import React from 'react';

function PlaceholderMapper({ placeholders, setFieldMappings }) {
    const handleMappingChange = (placeholder, value) => {
        setFieldMappings((prev) => ({
            ...prev,
            [placeholder]: value,
        }));
    };

    const uniquePlaceholders = Array.from(new Set(placeholders));

    return (
        <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '10px' }}>
                {uniquePlaceholders.map((placeholder) => (
                    <React.Fragment key={placeholder}>
                        <span style={{ textAlign: 'right', fontWeight: 'bold' }}>{placeholder}:</span>
                        <input
                            type="text"
                            placeholder="Field Name"
                            onChange={(e) => handleMappingChange(placeholder, e.target.value)}
                            style={{ width: '100%', textAlign: 'left' }}
                        />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default PlaceholderMapper;
