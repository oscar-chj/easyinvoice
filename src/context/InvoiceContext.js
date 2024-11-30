import React, { createContext, useState, useEffect } from 'react';
import { getInvoices, saveInvoices } from '../utils/InvoiceStorage';

export const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const storedInvoices = getInvoices();
    if (storedInvoices) {
      setInvoices(storedInvoices);
    }
  }, []);

  useEffect(() => {
    saveInvoices(invoices);
  }, [invoices]);

  return (
    <InvoiceContext.Provider value={{ invoices, setInvoices }}>
      {children}
    </InvoiceContext.Provider>
  );
};
