export default function Item({ item, onDeleteItem, onToggleItem }) {
    return (
        <li>
            <input type="checkbox" id={`item-${item[0]}`} name={`item-${item[0]}`} checked={item[3]} onChange={() => { onToggleItem(item[0]); }} />
            <span className="itemSpan" style={item[3] ? { textDecoration: "line-through" } : {}}>
                {item[2]} {item[1]}
            </span>
            <button onClick={() => onDeleteItem(item[0])}>❌</button>
        </li>
    );
};