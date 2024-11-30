import React, { useState, useEffect } from 'react';

function PlaceholderMapper({ placeholders, setFieldMappings, onNextStep }) {
    const [repeatingFields, setRepeatingFields] = useState({});
    const [totals, setTotals] = useState({
        total_amount: 0,
        amount_paid: 0,
        total_amount_due: 0,
    });

    // Filter unique placeholders
    const uniquePlaceholders = placeholders.filter(
        (placeholder) =>
            !['{{item_category}}', '{{item}}', '{{quantity}}', '{{unit_price}}', '{{discount}}', '{{amount}}', '{{category_subtotal}}', '{{total_amount}}', '{{total_amount_due}}'].includes(
                placeholder
            )
    );

    // Add a new item category
    const addCategory = () => {
        const newCategoryKey = `Category ${Object.keys(repeatingFields).length + 1}`;
        setRepeatingFields((prev) => ({
            ...prev,
            [newCategoryKey]: {
                items: [],
                category_subtotal: 0,
            },
        }));
    };

    // Remove an item category
    const removeCategory = (categoryKey) => {
        setRepeatingFields((prev) => {
            const updatedCategories = { ...prev };
            delete updatedCategories[categoryKey];
            return updatedCategories;
        });
    };

    // Add an item to a specific category
    const addItemToCategory = (categoryKey) => {
        setRepeatingFields((prev) => {
            const updatedCategory = { ...prev[categoryKey] };
            updatedCategory.items.push({
                item: '',
                quantity: 0,
                unit_price: 0,
                discount: 0,
                amount: 0,
            });
            return {
                ...prev,
                [categoryKey]: updatedCategory,
            };
        });
    };

    // Remove an item from a specific category
    const removeItemFromCategory = (categoryKey, index) => {
        setRepeatingFields((prev) => {
            const updatedCategory = { ...prev[categoryKey] };
            updatedCategory.items.splice(index, 1);
            updatedCategory.category_subtotal = calculateCategorySubtotal(updatedCategory.items);
            return {
                ...prev,
                [categoryKey]: updatedCategory,
            };
        });
    };

    // Update item details in a category
    const updateItemInCategory = (categoryKey, index, field, value) => {
        setRepeatingFields((prev) => {
            const updatedCategory = { ...prev[categoryKey] };
            const updatedItems = [...updatedCategory.items];

            // Ensure non-negative values for quantity, unit_price, and discount
            if (['quantity', 'unit_price', 'discount'].includes(field)) {
                const parsedValue = parseFloat(value) || 0;
                updatedItems[index][field] = parsedValue >= 0 ? parsedValue : 0;
            } else {
                updatedItems[index][field] = value;
            }

            // Update amount if any input affects it
            updatedItems[index].amount =
                updatedItems[index].quantity * updatedItems[index].unit_price * (1 - updatedItems[index].discount / 100);

            updatedCategory.items = updatedItems;
            updatedCategory.category_subtotal = calculateCategorySubtotal(updatedItems);
            return {
                ...prev,
                [categoryKey]: updatedCategory,
            };
        });
    };

    // Calculate category subtotal
    const calculateCategorySubtotal = (items) => {
        return items.reduce((subtotal, item) => subtotal + item.amount, 0);
    };

    // Calculate total amounts dynamically
    useEffect(() => {
        const totalAmount = Object.values(repeatingFields).reduce(
            (sum, category) => sum + category.category_subtotal,
            0
        );
        setTotals((prev) => ({
            ...prev,
            total_amount: totalAmount,
            total_amount_due: totalAmount - prev.amount_paid,
        }));
    }, [repeatingFields]);

    // Handle amount_paid changes
    const handleAmountPaidChange = (value) => {
        const amountPaid = parseFloat(value) || 0;
        setTotals((prev) => ({
            ...prev,
            amount_paid: amountPaid,
            total_amount_due: prev.total_amount - amountPaid,
        }));
    };

    return (
        <div>
            {/* Unique placeholders */}
            <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '10px', marginBottom: '20px' }}>
                {uniquePlaceholders.map((placeholder) => (
                    <React.Fragment key={placeholder}>
                        <span style={{ textAlign: 'right', fontWeight: 'bold' }}>{placeholder}:</span>
                        <input
                            type="text"
                            placeholder="Field Name"
                            onChange={(e) =>
                                setFieldMappings((prev) => ({
                                    ...prev,
                                    [placeholder]: e.target.value,
                                }))
                            }
                            style={{ width: '100%', textAlign: 'left', padding: '5px' }}
                        />
                    </React.Fragment>
                ))}
            </div>

            {/* Add Category Button */}
            <button
                onClick={addCategory}
                style={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    marginBottom: '20px',
                }}
            >
                + Add Item Category
            </button>

            {/* Repeating placeholders */}
            {Object.entries(repeatingFields).map(([categoryKey, categoryData]) => (
                <div key={categoryKey} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong>{categoryKey}</strong>
                        <button
                            onClick={() => removeCategory(categoryKey)}
                            style={{
                                backgroundColor: 'red',
                                color: 'white',
                                border: 'none',
                                padding: '5px 10px',
                                cursor: 'pointer',
                                borderRadius: '4px',
                            }}
                        >
                            x
                        </button>
                    </div>

                    {/* Table Titles */}
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '5px', fontWeight: 'bold' }}>
                        <span style={{ width: '25%' }}>Item Name</span>
                        <span style={{ width: '10%' }}>Quantity</span>
                        <span style={{ width: '15%' }}>Unit Price</span>
                        <span style={{ width: '15%' }}>Discount (%)</span>
                        <span style={{ width: '15%' }}>Amount</span>
                    </div>

                    <div>
                        {categoryData.items.map((item, index) => (
                            <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
                                <input
                                    type="text"
                                    placeholder="Item"
                                    value={item.item}
                                    onChange={(e) => updateItemInCategory(categoryKey, index, 'item', e.target.value)}
                                    style={{ width: '25%' }}
                                />
                                <input
                                    type="number"
                                    placeholder="Qty"
                                    value={item.quantity}
                                    onChange={(e) => updateItemInCategory(categoryKey, index, 'quantity', e.target.value)}
                                    style={{ width: '10%' }}
                                />
                                <input
                                    type="number"
                                    placeholder="Price"
                                    value={item.unit_price}
                                    onChange={(e) => updateItemInCategory(categoryKey, index, 'unit_price', e.target.value)}
                                    style={{ width: '15%' }}
                                />
                                <input
                                    type="number"
                                    placeholder="Disc (%)"
                                    value={item.discount}
                                    onChange={(e) => updateItemInCategory(categoryKey, index, 'discount', e.target.value)}
                                    style={{ width: '15%' }}
                                />
                                <input
                                    type="number"
                                    placeholder="Amount"
                                    value={item.amount.toFixed(2)}
                                    readOnly
                                    style={{ width: '15%' }}
                                />
                                <button
                                    onClick={() => removeItemFromCategory(categoryKey, index)}
                                    style={{
                                        backgroundColor: 'red',
                                        color: 'white',
                                        border: 'none',
                                        padding: '5px 10px',
                                        cursor: 'pointer',
                                        borderRadius: '4px',
                                    }}
                                >
                                    x
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={() => addItemToCategory(categoryKey)}
                            style={{
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                padding: '5px 10px',
                                cursor: 'pointer',
                                borderRadius: '4px',
                                marginTop: '10px',
                            }}
                        >
                            + Add Item
                        </button>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <strong>Category Subtotal:</strong> {categoryData.category_subtotal.toFixed(2)}
                    </div>
                </div>
            ))}

            {/* Total Amount and Amount Paid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '10px', marginTop: '20px' }}>
                <span style={{ textAlign: 'right', fontWeight: 'bold' }}>Total Amount:</span>
                <span>{totals.total_amount.toFixed(2)}</span>

                <span style={{ textAlign: 'right', fontWeight: 'bold' }}>Amount Paid:</span>
                <input
                    type="number"
                    value={totals.amount_paid}
                    onChange={(e) => handleAmountPaidChange(e.target.value)}
                    style={{ textAlign: 'left', padding: '5px' }}
                />

                <span style={{ textAlign: 'right', fontWeight: 'bold' }}>Total Amount Due:</span>
                <span>{totals.total_amount_due.toFixed(2)}</span>
            </div>

            {/* Next Step Button */}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button
                    onClick={onNextStep}
                    style={{
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        borderRadius: '4px',
                    }}
                >
                    Next Step
                </button>
            </div>
        </div>
    );
}

export default PlaceholderMapper;
