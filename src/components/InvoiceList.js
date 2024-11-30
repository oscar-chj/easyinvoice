import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { InvoiceContext } from '../context/InvoiceContext';

function InvoiceList() {
  const { invoices, setInvoices } = useContext(InvoiceContext);

  const deleteInvoice = (id) => {
    const updatedInvoices = invoices.filter((invoice) => invoice.id !== id);
    setInvoices(updatedInvoices);
  };

  return (
    <div>
      <h1>Invoices</h1>
      <Link to="/create">
        <button>Create New Invoice</button>
      </Link>
      {invoices.length === 0 ? (
        <p>No invoices available.</p>
      ) : (
        <table border="1" cellPadding="5" cellSpacing="0">
          <thead>
            <tr>
              <th>Invoice Number</th>
              <th>Buyer Name</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.invoiceNumber}</td>
                <td>{invoice.buyerInfo.name}</td>
                <td>{invoice.date}</td>
                <td>
                  <Link to={`/invoice/${invoice.id}`}>
                    <button>View</button>
                  </Link>
                  <Link to={`/edit/${invoice.id}`}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => deleteInvoice(invoice.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default InvoiceList;
