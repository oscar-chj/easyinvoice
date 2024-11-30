import React from 'react';

function InvoiceItem({ items, setItems }) {
  const addItem = () => {
    setItems([...items, { id: Date.now(), name: '', quantity: 1, price: 0, discount: 0 }]);
  };

  const handleItemChange = (id, field, value) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const calculateTotal = (item) => {
    return (item.quantity * item.price * (1 - item.discount / 100)).toFixed(2);
  };

  const calculateSubTotal = () => {
    return items.reduce((total, item) => total + parseFloat(calculateTotal(item)), 0).toFixed(2);
  };

  return (
    <div>
      <h2>Invoice Items</h2>
      <button type="button" onClick={addItem}>Add Item</button>
      {items.map((item) => (
        <div key={item.id} style={{ marginBottom: '10px' }}>
          <input
            placeholder="Item Name"
            value={item.name}
            onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={item.quantity}
            onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Unit Price"
            value={item.price}
            onChange={(e) => handleItemChange(item.id, 'price', e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Discount (%)"
            value={item.discount}
            onChange={(e) => handleItemChange(item.id, 'discount', e.target.value)}
          />
          <span>Total: {calculateTotal(item)}</span>
          <button type="button" onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      <h3>SubTotal: {calculateSubTotal()}</h3>
    </div>
  );
}

export default InvoiceItem;
