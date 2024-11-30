import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { InvoiceContext } from '../context/InvoiceContext';
import CompanyDetails from './CompanyDetails';
import BuyerDetails from './BuyerDetails';
import InvoiceItem from './InvoiceItem';
import { v4 as uuidv4 } from 'uuid';

function InvoiceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { invoices, setInvoices } = useContext(InvoiceContext);

  const isEditMode = id ? true : false;
  const existingInvoice = isEditMode
    ? invoices.find((invoice) => invoice.id === id)
    : null;

  const [invoiceNumber, setInvoiceNumber] = useState(
    existingInvoice ? existingInvoice.invoiceNumber : invoices.length + 1
  );
  const [date, setDate] = useState(
    existingInvoice ? existingInvoice.date : new Date().toISOString().split('T')[0]
  );
  const [companyInfo, setCompanyInfo] = useState(
    existingInvoice ? existingInvoice.companyInfo : {}
  );
  const [buyerInfo, setBuyerInfo] = useState(
    existingInvoice ? existingInvoice.buyerInfo : {}
  );
  const [items, setItems] = useState(existingInvoice ? existingInvoice.items : []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const invoiceData = {
      id: isEditMode ? existingInvoice.id : uuidv4(),
      invoiceNumber,
      date,
      companyInfo,
      buyerInfo,
      items,
    };

    if (isEditMode) {
      const updatedInvoices = invoices.map((inv) =>
        inv.id === id ? invoiceData : inv
      );
      setInvoices(updatedInvoices);
    } else {
      setInvoices([...invoices, invoiceData]);
    }
    navigate('/');
  };

  return (
    <div>
      <h1>{isEditMode ? 'Edit Invoice' : 'Create Invoice'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Invoice Number: {invoiceNumber}</label>
        </div>
        <div>
          <label>Date: </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <CompanyDetails
          companyInfo={companyInfo}
          setCompanyInfo={setCompanyInfo}
        />
        <BuyerDetails buyerInfo={buyerInfo} setBuyerInfo={setBuyerInfo} />
        <InvoiceItem items={items} setItems={setItems} />
        <button type="submit">Save Invoice</button>
      </form>
    </div>
  );
}

export default InvoiceForm;
