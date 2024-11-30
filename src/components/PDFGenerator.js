import React from 'react';
import { writeExcelFile, fillPlaceholders } from '../utils/excelUtils';
import { saveAs } from 'file-saver';
import { generatePDF } from '../utils/pdfUtils';

function PDFGenerator({ templateData, fieldMappings, invoiceData }) {
  const handleGenerate = () => {
    // Create a deep copy of the workbook to avoid mutating the original template
    const workbook = JSON.parse(JSON.stringify(templateData));
    fillPlaceholders(workbook, fieldMappings, invoiceData);
    const excelBuffer = writeExcelFile(workbook);

    // Convert Excel buffer to Blob
    const excelBlob = new Blob([excelBuffer], {
      type:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    // Save the filled Excel file (optional)
    saveAs(excelBlob, 'Filled_Invoice.xlsx');

    // Generate PDF from the filled Excel data
    generatePDF(workbook);
  };

  return (
    <div>
      <button onClick={handleGenerate}>Download PDF</button>
    </div>
  );
}

export default PDFGenerator;
