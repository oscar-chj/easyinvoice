import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

export const generatePDF = (workbook) => {
  const doc = new jsPDF();

  workbook.SheetNames.forEach((sheetName) => {
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    jsonData.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const text = cell !== undefined ? cell.toString() : '';
        const x = 10 + colIndex * 30;
        const y = 10 + rowIndex * 10;
        doc.text(text, x, y);
      });
    });

    // Add a new page if there are more sheets
    if (workbook.SheetNames.length > 1 && sheetName !== workbook.SheetNames[workbook.SheetNames.length - 1]) {
      doc.addPage();
    }
  });

  doc.save('Invoice.pdf');
};
