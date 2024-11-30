import React from 'react';

function CompanyDetails({ companyInfo, setCompanyInfo }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2>Company Details</h2>
      <input
        name="name"
        placeholder="Company Name"
        value={companyInfo.name || ''}
        onChange={handleChange}
        required
      />
      <input
        name="address"
        placeholder="Address"
        value={companyInfo.address || ''}
        onChange={handleChange}
        required
      />
      <input
        name="contact"
        placeholder="Contact Info"
        value={companyInfo.contact || ''}
        onChange={handleChange}
        required
      />
    </div>
  );
}

export default CompanyDetails;
