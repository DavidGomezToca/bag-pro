export default function Item({ item, onDeleteItem, onToggleItem }) {
    return (
        <li>
            <input type="checkbox" value={item[3]} onChange={() => { onToggleItem(item[0]); }} />
            <span style={item[3] ? { textDecoration: "line-through" } : {}}>
                {item[2]} {item[1]}
            </span>
            <button onClick={() => onDeleteItem(item[0])}>❌</button>
        </li>
    );
};