import { useState } from "react"

/**
 * @component Form.
 * @param {array[items]} items - The items list.
 * @param {function} addItem - Adds a new item to the list.
 * @param {function} addItemQuantity - Increases the quantity of an existing item.
 * @param {function} setItemFalse - Sets the packed status of an item to false.
 * @returns {JSX.Element} - The Form component.
 */
export default function Form({ items, addItem, addItemQuantity, setItemFalse }) {
    /**
     * Description of the item submitted.
     * @type {string, function}.
     */
    const [description, setDescription] = useState("")

    /**
     * Quantity of the item submitted.
     * @type {number, function}.
     */
    const [quantity, setQuantity] = useState(1)

    /**
     * Proces the submit.
     * @param {React.FormEvent} e - The form submission event.
     */
    function handleSubmit(e) {
        e.preventDefault()
        // If the description is empty, return.
        if (!description) return
        let capitalizedDescription = description.charAt(0).toUpperCase() + description.slice(1).toLowerCase()
        let originalItemID = items.find(item => item[1] === capitalizedDescription)?.[0]
        // If the item already exists, increase the quantity.
        if (originalItemID !== undefined) {
            addItemQuantity(originalItemID, quantity)
            setItemFalse(originalItemID)
        }
        // If the item is not in the list, add it.
        else {
            const newItem = [Date.now(), capitalizedDescription, quantity, false]
            addItem(newItem)
        }
        // Reset the form.
        setDescription("")
        setQuantity(1)
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <div>
                <h3>What do you need for your trip?</h3>
            </div>
            <div className="form-inputs">
                <div>
                    <select id="quantity" name="quantity" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                        {Array.from({ length: 5 }, (_, i) => i + 1).map(num => (<option value={num} key={num}>{num}</option>))}
                    </select>
                    <input id="item_name" name="item_name" type="text" placeholder="Item..." maxLength="10" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                    <button type="submit" className={`${description ? "" : "disabled"}`}>Add</button>
                </div>
            </div>
        </form >
    )
}