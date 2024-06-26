import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const AllocationForm = (props) => {
    const { dispatch, remaining, currency } = useContext(AppContext);

    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [action, setAction] = useState('');

    const highlightButton = (isAdded) => {
        const button = document.getElementById('save');

        if (isAdded) {
            button.style.backgroundColor = 'green';
            button.style.color = 'white';
            button.innerText = 'Added!';
            setTimeout(() => {
                button.style.backgroundColor = '';
                button.style.color = '';
                button.innerText = 'Save';
            }, 1000);
        } else {
            button.style.backgroundColor = 'red';
            button.style.color = 'white';
            button.innerText = 'Removed!';
            setTimeout(() => {
                button.style.backgroundColor = '';
                button.style.color = '';
                button.innerText = 'Save';
            }, 1000);
        }
    };

    const validateCost = (value) => {
        const inputField = document.getElementById('cost');
        const parsedValue = parseInt(value);

        if (isNaN(parsedValue)) {
            inputField.style.backgroundColor = 'lightcoral';
        } else {
            inputField.style.backgroundColor = '';
        }

        setCost(value);
    };

    const submitEvent = () => {
        const parsedCost = parseInt(cost);

        if (isNaN(parsedCost)) {
            alert("The value entered must be a number");
            setCost("");
            return;
        }

        if (parsedCost > remaining) {
            alert(`The value cannot exceed remaining funds: ${currency}` + remaining);
            setCost("");
            return;
        }

        const expense = {
            name: name,
            cost: parsedCost,
        };

        if (action === "Reduce") {
            dispatch({
                type: 'RED_EXPENSE',
                payload: expense,
            });
            highlightButton(false);
        } else {
            dispatch({
                type: 'ADD_EXPENSE',
                payload: expense,
            });
            highlightButton(true);
        }
    };

    return (
        <div>
            <div className='row'>
                <div className="input-group mb-3" style={{ marginLeft: '2rem' }}>
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Department</label>
                    </div>
                    <select className="custom-select" id="inputGroupSelect01" onChange={(event) => setName(event.target.value)}>
                        <option defaultValue>Choose...</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                        <option value="Finance">Finance</option>
                        <option value="HR">HR</option>
                        <option value="IT">IT</option>
                        <option value="Admin">Admin</option>
                    </select>

                    <div className="input-group-prepend" style={{ marginLeft: '2rem' }}>
                        <label className="input-group-text" htmlFor="inputGroupSelect02">Allocation</label>
                    </div>
                    <select className="custom-select" id="inputGroupSelect02" onChange={(event) => setAction(event.target.value)}>
                        <option defaultValue value="Add">Add</option>
                        <option value="Reduce">Reduce</option>
                    </select>

                    <div className="input-group-prepend" style={{ marginLeft: '2rem' }}>
                        <span className="input-group-text">{currency}</span>
                    </div>
                    <input
                        required='required'
                        type='number'
                        id='cost'
                        value={cost}
                        style={{ size: 10 }}
                        onChange={(event) => validateCost(event.target.value)}
                    >
                    </input>

                    <button id='save' className="btn btn-primary" onClick={submitEvent} style={{ marginLeft: '2rem' }}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllocationForm;
