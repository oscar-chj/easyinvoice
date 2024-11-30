import React from 'react';
import { readExcelFile } from '../utils/excelUtils';

function TemplateUploader({ setTemplateData }) {
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const data = await readExcelFile(file);
      setTemplateData(data);
    }
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
    </div>
  );
}

export default TemplateUploader;
