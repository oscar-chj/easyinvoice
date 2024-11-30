import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InvoiceList from './InvoiceList';
import InvoiceForm from './InvoiceForm';
import InvoiceDetails from './InvoiceDetails';
import { InvoiceProvider } from '../context/InvoiceContext';
import Navbar from './Navbar';

function App() {
  return (
    <InvoiceProvider>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<InvoiceList />} />
            <Route path="/create" element={<InvoiceForm />} />
            <Route path="/edit/:id" element={<InvoiceForm />} />
            <Route path="/invoice/:id" element={<InvoiceDetails />} />
          </Routes>
        </div>
      </Router>
    </InvoiceProvider>
  );
}

export default App;
