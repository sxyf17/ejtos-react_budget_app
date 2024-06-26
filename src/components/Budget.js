import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, dispatch, remaining, currency } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupColor, setPopupColor] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const handleBudgetChange = (event) => {
        let newBudget = parseInt(event.target.value);
        let difference = newBudget - budget;
        console.log(remaining);
        if (newBudget > 20000) {
            alert(`Cannot exceed budget value of ${currency}20,000`);
            return;
        } else if (remaining === 0) {
            alert("Cannot reduce budget value less than spending.");
            return;
        }

        if (difference % 10 === 0) {
            dispatch({
                type: 'SET_BUDGET',
                payload: newBudget,
            });

            if (difference > 0) {
                setPopupMessage(`+${currency + difference}`);
                setPopupColor('green');
            } else if (difference < 0) {
                setPopupMessage(`-${currency + Math.abs(difference)}`);
                setPopupColor('red');
            }
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 1000);
        }
        setNewBudget(newBudget);

    }

    return (
        <div className='alert alert-secondary' style={{ position: 'relative' }}>
            <span>Budget: {currency}<input type="number" step="10" value={newBudget} onChange={handleBudgetChange}></input>
                {showPopup && <div className={`popup ${popupColor}`}>{popupMessage}</div>}
            </span>
        </div>
    );
};

export default Budget;