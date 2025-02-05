import Item from "./Item"
import { useState } from "react"

/**
 * @component PackingList.
 * @param {array[items]} items - The items list.
 * @param {function} onDeleteItem - Deletes an item from the list.
 * @param {function} onToggleItem - Toggles the packed status of an item.
 * @param {function} onClearList - Confirms the clearing of the list.
 * @returns {JSX.Element} - The PackingList component.
 */
export default function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
    /**
     * Sort method.
     * @type {string, function}.
     */
    const [sortBy, setSortBy] = useState("input")

    /**
     * Current page.
     * @type {number, function}.
     */
    const [page, setPage] = useState(0)

    /**
     * Quantity of items per page.
     * @type {number}.
     */
    const itemsPerPage = 10

    /**
     * Sorted items.
     * @type {object}.
     */
    let sortedItems
    switch (sortBy) {
        case "input":
            sortedItems = items
            break
        case "description":
            sortedItems = items.slice().sort((a, b) => a[1].localeCompare(b[1]))
            break
        case "packed":
            sortedItems = items.slice().sort((a, b) => Number(a[3]) - Number(b[3]))
            break
        default:
            sortedItems = items
    }

    /**
     * Total number of pages.
     * @type {number}.
     */
    const totalPages = Math.ceil(sortedItems.length / itemsPerPage)

    /**
     * Paginated items.
     * @type {object}.
     */
    const paginatedItems = sortedItems.slice(page * itemsPerPage, (page + 1) * itemsPerPage)

    /**
     * Handles going to the previous page.
     */
    function handlePrevPage() {
        if (totalPages === 0) return
        setPage(prev => (prev === 0 ? totalPages - 1 : prev - 1))
    }

    /**
     * Handles going to the next page.
     */
    function handleNextPage() {
        setPage(prev => (prev >= totalPages - 1 ? 0 : prev + 1))
    }

    /**
     * Handles clearing the list.
     */
    function handleClearList() {
        setPage(0)
        onClearList()
    }

    return (
        <div className="list">
            {sortedItems.length === 0 ? (
                <p className="list-empty">List empty...</p>
            ) : (
                <ul> {
                    paginatedItems.map(item => (
                        <Item item={item} key={item[0]} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />
                    ))}
                </ul>
            )}
            <div className="actions">
                <div>
                    <select id="type-sort" name="type-sort" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                        <option value="input">Sort by input order</option>
                        <option value="description">Sort by name</option>
                        <option value="packed">Sort by packed status</option>
                    </select>
                </div>
                <div className="pagination">
                    <button onClick={handlePrevPage}>◀ Previous</button>
                    <span>Page {totalPages === 0 ? page : page + 1} of {totalPages}</span>
                    <button onClick={handleNextPage}>Next ▶</button>
                </div>
                <div>
                    <button onClick={handleClearList}>Clear list</button>
                </div>
            </div>
        </div>
    )
}