import React from 'react';

function BuyerDetails({ buyerInfo, setBuyerInfo }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBuyerInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2>Buyer Details</h2>
      <input
        name="name"
        placeholder="Buyer Name"
        value={buyerInfo.name || ''}
        onChange={handleChange}
        required
      />
      <input
        name="address"
        placeholder="Address"
        value={buyerInfo.address || ''}
        onChange={handleChange}
        required
      />
      <input
        name="contact"
        placeholder="Contact Info"
        value={buyerInfo.contact || ''}
        onChange={handleChange}
        required
      />
    </div>
  );
}

export default BuyerDetails;
