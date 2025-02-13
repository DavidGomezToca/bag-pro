import { TranslationsContext } from "../contexts/TranslationsContext"

import Item from "./Item"
import { useState, useContext } from "react"

/**
 * @component PackingList.
 * @param {array[object]} items - The items list.
 * @param {function} onDeleteItem - Deletes an item from the list.
 * @param {function} onToggleItem - Toggles the packed status of an item.
 * @param {function} onClearList - Confirms the clearing of the list.
 * @returns {JSX.Element} - The PackingList component.
 */
export default function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
    /**
     * Translations context.
     * @type {string, object, function}.
     */
    const { language, translations, changeLanguage } = useContext(TranslationsContext)

    /**
     * Texts translated.
     * @type {object}.
     */
    const texts = translations.packingList;

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
        <div className="packing-list">
            {sortedItems.length === 0 ? (
                <p className="packing-list-empty">{texts[0]}</p>
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
                        <option value="input">{texts[1]}</option>
                        <option value="description">{texts[2]}</option>
                        <option value="packed">{texts[3]}</option>
                    </select>
                </div>
                <div className="pagination">
                    <button onClick={handlePrevPage}>◀ {texts[4]}</button>
                    <span>{texts[5]} {totalPages === 0 ? page : page + 1} {texts[6]} {totalPages}</span>
                    <button onClick={handleNextPage}>{texts[7]} ▶</button>
                </div>
                <div>
                    <button onClick={handleClearList}>{texts[8]}</button>
                </div>
                <div>
                    <img className="language-flag" src={`flags/${language}.png`} alt={`Language Flag ${language}`} onClick={() => changeLanguage()} />
                </div>
            </div>
        </div>
    )
}