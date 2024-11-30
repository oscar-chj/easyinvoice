import React, { useState } from 'react';
import TemplateUploader from './TemplateUploader';
import PlaceholderMapper from './PlaceholderMapper';
import DataInputForm from './DataInputForm';
import PDFGenerator from './PDFGenerator';
import './App.css';

function App() {
    const [templateData, setTemplateData] = useState(null);
    const [placeholders, setPlaceholders] = useState([]); // Tracks detected placeholders
    const [fieldMappings, setFieldMappings] = useState({});
    const [invoiceData, setInvoiceData] = useState({});

    return (
        <div className="container">
            <h1>Invoice Template Filler</h1>

            {/* Step 1: Import Template */}
            <div className="section">
                <h2>Step 1: Import Template</h2>
                <TemplateUploader
                    setTemplateData={setTemplateData}
                    setPlaceholders={setPlaceholders}
                />
            </div>

            {/* Step 2: Define Placeholders */}
            {templateData && (
                <div className="section">
                    <h2>Step 2: Define Placeholders</h2>
                    {placeholders.length > 0 ? (
                        <PlaceholderMapper
                            placeholders={placeholders}
                            setFieldMappings={setFieldMappings}
                        />
                    ) : (
                        <p style={{ color: 'red', textAlign: 'center' }}>
                            No placeholders were found in the uploaded file. Please upload a valid template.
                        </p>
                    )}
                </div>
            )}

            {/* Step 3: Fill Invoice Details */}
            {placeholders.length > 0 && (
                <div className="section">
                    <h2>Step 3: Fill Invoice Details</h2>
                    <DataInputForm
                        fieldMappings={fieldMappings}
                        setInvoiceData={setInvoiceData}
                    />
                </div>
            )}

            {/* Step 4: Generate Invoice */}
            {Object.keys(invoiceData).length > 0 && (
                <div className="section">
                    <h2>Step 4: Generate Invoice</h2>
                    <PDFGenerator
                        templateData={templateData}
                        fieldMappings={fieldMappings}
                        invoiceData={invoiceData}
                    />
                </div>
            )}
        </div>
    );
}

export default App;
