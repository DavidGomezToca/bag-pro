import { useState } from "react";

export default function Form({ items, addItem, addItemQuantity, setItemFalse }) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);

    function handleSubmit(e) {
        e.preventDefault();
        if (!description) return;
        let capitalizedDescription = description.charAt(0).toUpperCase() + description.slice(1).toLowerCase();
        let originalItemID = items.find(item => item[1] === capitalizedDescription)?.[0];
        if (originalItemID !== undefined) {
            addItemQuantity(originalItemID, quantity);
            setItemFalse(originalItemID);
        } else {
            const newItem = [Date.now(), capitalizedDescription, quantity, false];
            addItem(newItem);
        }
        setDescription("");
        setQuantity(1);
    };

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <div>
                <h3>What do you need for your trip?</h3>
            </div>
            <div className="form-inputs">
                <div>
                    <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                        {Array.from({ length: 5 }, (_, i) => i + 1).map(num => (<option value={num} key={num}>{num}</option>))}
                    </select>
                    <input type="text" placeholder="Item..." maxLength="10" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                    <button className={`${description ? "" : "disabled"}`}>Add</button>
                </div>
            </div>
        </form >
    );
};