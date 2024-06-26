import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Currency = () => {
    const { currency, dispatch } = useContext(AppContext);
    const [newCurrency, setNewCurrency] = useState(currency);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleCurrencyChange = (selectedCurrency) => {
        dispatch({
            type: 'CHG_CURRENCY',
            payload: selectedCurrency,
        });
        setNewCurrency(selectedCurrency);
        setShowDropdown(false); // Close the dropdown after selection
    }

    return (
        <div className="dropdown" style={{ marginLeft: '2rem' }}>
            <button
                className="btn btn-outline-success dropdown-toggle"
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
            >
                Currency ({currency})
            </button>
            {showDropdown && (
                <div className="dropdown-menu show">
                    <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => handleCurrencyChange('$')}
                    >
                        Dollar $
                    </a>
                    <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => handleCurrencyChange('£')}
                    >
                        Pound £
                    </a>
                    <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => handleCurrencyChange('€')}
                    >
                        Euro €
                    </a>
                    <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => handleCurrencyChange('₹')}
                    >
                        Rupee ₹
                    </a>
                </div>
            )}
        </div>
    );
};

export default Currency;
