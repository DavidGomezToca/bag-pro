import { useState } from "react";

export default function Form({ onAddItems }) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);

    function handleSubmit(e) {
        e.preventDefault();
        if (!description) {
            return
        };
        const newItem = ([Date.now(), description, quantity, false]);
        onAddItems(newItem);
        setDescription("");
        setQuantity(1);
    };

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <div>
                <h3>What do you need for your trip?</h3>
            </div>
            <div>
                <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                    {Array.from({ length: 5 }, (_, i) => i + 1).map(num => (<option value={num} key={num}>{num}</option>))}
                </select>
                <input type="text" placeholder="Item..." value={description} onChange={(e) => setDescription(e.target.value)} />
                <button>Add</button>
            </div>
        </form >
    );
};