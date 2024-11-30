import React, { useState } from 'react';
import TemplateUploader from './TemplateUploader';
import PlaceholderMapper from './PlaceholderMapper';
import DataInputForm from './DataInputForm';
import PDFGenerator from './PDFGenerator';
import './App.css'; // For styling

function App() {
  const [templateData, setTemplateData] = useState(null);
  const [placeholders, setPlaceholders] = useState([]);
  const [fieldMappings, setFieldMappings] = useState({});
  const [invoiceData, setInvoiceData] = useState({});

  return (
    <div className="container">
      <h1>Invoice Template Filler</h1>

      {/* Step 1: Import Template */}
      <div className="section">
        <h2>
          Step 1: Import Template
          <span className="info-icon" data-tooltip="Upload your Excel template to begin creating invoices.">i</span>
        </h2>
        <TemplateUploader setTemplateData={setTemplateData} />
      </div>

      {/* Step 2: Define Placeholders */}
      {templateData && (
        <div className="section">
          <h2>
            Step 2: Define Placeholders
            <span className="info-icon" data-tooltip="Match placeholders in your template to dynamic fields like Invoice Number or Customer Name.">i</span>
          </h2>
          <PlaceholderMapper
            templateData={templateData}
            setPlaceholders={setPlaceholders}
            setFieldMappings={setFieldMappings}
          />
        </div>
      )}

      {/* Step 3: Fill Invoice Details */}
      {placeholders.length > 0 && (
        <div className="section">
          <h2>
            Step 3: Fill Invoice Details
            <span className="info-icon" data-tooltip="Input the required details for the invoice, such as customer information and itemized data.">i</span>
          </h2>
          <DataInputForm
            fieldMappings={fieldMappings}
            setInvoiceData={setInvoiceData}
          />
        </div>
      )}

      {/* Step 4: Generate Invoice */}
      {Object.keys(invoiceData).length > 0 && (
        <div className="section">
          <h2>
            Step 4: Generate Invoice
            <span className="info-icon" data-tooltip="Download or preview the finalized invoice as a PDF.">i</span>
          </h2>
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
