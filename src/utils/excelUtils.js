import * as XLSX from 'xlsx';

export const readExcelFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      resolve(workbook);
    };
    reader.onerror = (err) => {
      reject(err);
    };
    reader.readAsArrayBuffer(file);
  });
};

export const writeExcelFile = (workbook) => {
  const wbout = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  });
  return wbout;
};

export const findPlaceholders = (workbook) => {
  const placeholders = new Set();
  workbook.SheetNames.forEach((sheetName) => {
    const sheet = workbook.Sheets[sheetName];
    const range = XLSX.utils.decode_range(sheet['!ref']);
    for (let row = range.s.r; row <= range.e.r; row++) {
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = { c: col, r: row };
        const cellRef = XLSX.utils.encode_cell(cellAddress);
        const cell = sheet[cellRef];
        if (cell && typeof cell.v === 'string' && cell.v.startsWith('{{') && cell.v.endsWith('}}')) {
          console.log('Detected Placeholder:', cell.v); // DEBUG
          placeholders.add(cell.v.slice(2, -2)); // Remove '{{' and '}}'
        }
      }
    }
  });
  return Array.from(placeholders);
};

export const fillPlaceholders = (workbook, fieldMappings, invoiceData) => {
  workbook.SheetNames.forEach((sheetName) => {
    const sheet = workbook.Sheets[sheetName];
    const range = XLSX.utils.decode_range(sheet['!ref']);
    for (let row = range.s.r; row <= range.e.r; row++) {
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = { c: col, r: row };
        const cellRef = XLSX.utils.encode_cell(cellAddress);
        const cell = sheet[cellRef];
        if (cell && typeof cell.v === 'string' && cell.v.startsWith('{{') && cell.v.endsWith('}}')) {
          const placeholder = cell.v.slice(2, -2);
          const fieldName = fieldMappings[placeholder];
          if (fieldName && invoiceData[fieldName] !== undefined) {
            sheet[cellRef].v = invoiceData[fieldName];
          }
        }
      }
    }
  });
};
