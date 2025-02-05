import { useState } from "react";
import Item from "./Item";

export default function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
    const [sortBy, setSortBy] = useState("input");
    const [page, setPage] = useState(0);
    const itemsPerPage = 10;
    let sortedItems;

    if (sortBy === "input") sortedItems = items;
    if (sortBy === "description") sortedItems = items.slice().sort((a, b) => a[1].localeCompare(b[1]));
    if (sortBy === "packed") sortedItems = items.slice().sort((a, b) => Number(a[3]) - Number(b[3]));

    const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
    const paginatedItems = sortedItems.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

    function handlePrevPage() {
        setPage(prev => (prev === 0 ? totalPages - 1 : prev - 1));
    }

    function handleNextPage() {
        setPage(prev => (prev >= totalPages - 1 ? 0 : prev + 1));
    }

    return (
        <div className="list">
            <ul>
                {paginatedItems.map(item => (
                    <Item item={item} key={item[0]} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />
                ))}
            </ul>
            <div className="actions">
                <div>
                    <select id="type-sort" name="type-sort" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                        <option value="input">Sort by input order</option>
                        <option value="description">Sort by name</option>
                        <option value="packed">Sort by packed status</option>
                    </select>
                </div>
                <div className="pagination">
                    <button onClick={handlePrevPage}>
                        ◀ Previous
                    </button>
                    <span> Page {page + 1} of {totalPages} </span>
                    <button onClick={handleNextPage}>
                        Next ▶
                    </button>
                </div>
                <div>
                    <button onClick={onClearList}>Clear list</button>
                </div>
            </div>
        </div>
    );
};