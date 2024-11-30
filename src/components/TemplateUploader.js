import React from 'react';
import * as XLSX from 'xlsx';

function TemplateUploader({ setTemplateData, setPlaceholders }) {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const validExtensions = ['.xlsx', '.xlsm', '.xls'];

    if (!file || !validExtensions.some((ext) => file.name.endsWith(ext))) {
        alert('Invalid file format. Please upload a valid .xlsm, .xlsx, or .xls file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const data = new Uint8Array(event.target.result);
            console.log('File data loaded:', data);

            const workbook = XLSX.read(data, { type: 'array' });
            console.log('Workbook:', workbook);

            if (!workbook || !workbook.SheetNames || workbook.SheetNames.length === 0) {
                throw new Error('Invalid Excel file. Please upload a valid .xlsm, .xlsx, or .xls file.');
            }

            setTemplateData(workbook);

            const placeholders = findPlaceholders(workbook);
            setPlaceholders(placeholders);

            if (placeholders.length === 0) {
                console.warn('No placeholders found in the uploaded file.');
            } else {
                console.log('Detected placeholders:', placeholders);
            }
        } catch (error) {
            console.error('Error processing file:', error.message);
            alert('Failed to process the uploaded file. Please ensure it is a valid Excel file.');
        }
    };
    reader.readAsArrayBuffer(file);
};

const findPlaceholders = (workbook) => {
  if (!workbook || !workbook.SheetNames || workbook.SheetNames.length === 0) {
      console.warn('No sheets found in the workbook or workbook is invalid.');
      return [];
  }

  const placeholders = new Set();

  workbook.SheetNames.forEach((sheetName) => {
      try {
          const sheet = workbook.Sheets[sheetName];
          if (!sheet) {
              console.warn(`Skipping invalid or empty sheet: ${sheetName}`);
              return;
          }

          const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          if (!Array.isArray(sheetData) || sheetData.length === 0) {
              console.warn(`No valid data in sheet: ${sheetName}`);
              return;
          }

          sheetData.forEach((row, rowIndex) => {
              row.forEach((cellValue, colIndex) => {
                  if (
                      typeof cellValue === 'string' &&
                      cellValue.startsWith('{{') &&
                      cellValue.endsWith('}}')
                  ) {
                      placeholders.add(cellValue);
                  }
              });
          });
      } catch (error) {
          console.error(`Error processing sheet "${sheetName}":`, error.message);
      }
  });

  return Array.from(placeholders);
};

  
  

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <input type="file" accept=".xlsx, .xls, .xlsm" onChange={handleFileUpload} />
        </div>
    );
}

export default TemplateUploader;
