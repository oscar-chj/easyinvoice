import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { InvoiceContext } from '../context/InvoiceContext';
import PDFGenerator from './PDFGenerator';

function InvoiceDetails() {
  const { id } = useParams();
  const { invoices } = useContext(InvoiceContext);

  const invoice = invoices.find((inv) => inv.id === id);

  if (!invoice) {
    return (
      <div>
        <p>Invoice not found.</p>
        <Link to="/">Back to Invoice List</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Invoice #{invoice.invoiceNumber}</h1>
      <p>Date: {invoice.date}</p>
      <h2>Company Details</h2>
      <p>Name: {invoice.companyInfo.name}</p>
      <p>Address: {invoice.companyInfo.address}</p>
      <p>Contact: {invoice.companyInfo.contact}</p>
      <h2>Buyer Details</h2>
      <p>Name: {invoice.buyerInfo.name}</p>
      <p>Address: {invoice.buyerInfo.address}</p>
      <p>Contact: {invoice.buyerInfo.contact}</p>
      <h2>Items</h2>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Discount (%)</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.discount}</td>
              <td>
                {(
                  item.quantity *
                  item.price *
                  (1 - item.discount / 100)
                ).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>
        Grand Total:{' '}
        {invoice.items
          .reduce(
            (total, item) =>
              total +
              item.quantity * item.price * (1 - item.discount / 100),
            0
          )
          .toFixed(2)}
      </h3>
      <PDFGenerator invoice={invoice} />
      <Link to="/">Back to Invoice List</Link>
    </div>
  );
}

export default InvoiceDetails;
