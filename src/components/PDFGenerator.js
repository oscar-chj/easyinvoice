import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function PDFGenerator({ invoice }) {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`Invoice #${invoice.invoiceNumber}`, 10, 10);
    doc.text(`Date: ${invoice.date}`, 10, 20);

    doc.text('Company Details:', 10, 30);
    doc.text(`Name: ${invoice.companyInfo.name}`, 10, 40);
    doc.text(`Address: ${invoice.companyInfo.address}`, 10, 50);
    doc.text(`Contact: ${invoice.companyInfo.contact}`, 10, 60);

    doc.text('Buyer Details:', 10, 70);
    doc.text(`Name: ${invoice.buyerInfo.name}`, 10, 80);
    doc.text(`Address: ${invoice.buyerInfo.address}`, 10, 90);
    doc.text(`Contact: ${invoice.buyerInfo.contact}`, 10, 100);

    const tableColumn = ['Item Name', 'Quantity', 'Unit Price', 'Discount (%)', 'Total'];
    const tableRows = [];

    invoice.items.forEach((item) => {
      const itemData = [
        item.name,
        item.quantity,
        item.price,
        item.discount,
        (
          item.quantity *
          item.price *
          (1 - item.discount / 100)
        ).toFixed(2),
      ];
      tableRows.push(itemData);
    });

    doc.autoTable({
      startY: 110,
      head: [tableColumn],
      body: tableRows,
    });

    const finalY = doc.lastAutoTable.finalY || 110;
    const grandTotal = invoice.items
      .reduce(
        (total, item) =>
          total +
          item.quantity * item.price * (1 - item.discount / 100),
        0
      )
      .toFixed(2);

    doc.text(`Grand Total: ${grandTotal}`, 10, finalY + 10);

    doc.save(`invoice_${invoice.invoiceNumber}.pdf`);
  };

  return (
    <button onClick={generatePDF}>Download PDF</button>
  );
}

export default PDFGenerator;
