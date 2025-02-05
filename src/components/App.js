import Logo from "./Logo"
import Form from "./Form"
import Footer from "./Footer"
import Swal from "sweetalert2"
import { useState } from "react"
import PackingList from "./PackingList"
import ItemsData from "../data/ItemsData"

/**
 * @component App.
 * @returns {JSX.Element} - The App component.
 */
export default function App() {
  /**
   * Initial items list.
   * @type {object}.
   */
  const initialItems = new Array(ItemsData.items.length)
  ItemsData.items.forEach(element => {
    initialItems[element.id] = ([element.id, element.description, element.quantity, element.packed])
  })

  /**
   * Items list.
   * @type {object, function}.
   */
  const [items, setItems] = useState(initialItems)

  /**
   * Adds a new item to the list.
   * @param {[number, string, number, boolean]} item - The item to add.
   */
  function handleAddItem(item) {
    setItems(items => [...items, item])
  }

  /**
   * Deletes an item from the list.
   * @param {number} id - The ID of the item to delete.
   */
  function handleDeleteItem(id) {
    setItems(items => items.filter(item => item[0] !== id))
  }

  /**
   * Increases the quantity of an existing item.
   * @param {number} id - The ID of the item.
   * @param {number} quantity - The quantity to add.
   */
  function addItemQuantity(id, quantity) {
    setItems(items => items.map(item => item[0] === id ? { ...item, 2: item[2] + quantity } : item))
  }

  /**
   * Sets the packed status of an item to false.
   * @param {number} id - The ID of the item.
   */
  function setItemFalse(id) {
    setItems(items => items.map(item => item[0] === id ? { ...item, 3: false } : item))
  }

  /**
   * Toggles the packed status of an item.
   * @param {number} id - The ID of the item.
   */
  function handleToggleItem(id) {
    setItems(items => items.map(item => item[0] === id ? { ...item, 3: !item[3] } : item))
  }

  /**
   * Confirm clear list using SweetAlert2.
   */
  function handleClearList() {
    if (items.length > 0) {
      Swal.fire({
        title: "You want to clear the list?",
        text: "You won't be able to revert this!",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, clear it!",
        customClass: {
          htmlContainer: "swal2-text",
          confirmButton: "swal2-text",
          cancelButton: "swal2-text",
          popup: "swal2-popup"
        }
      }).then((result) => {
        if (result.isConfirmed) {
          // Clear the list.
          setItems([])
          Swal.fire({
            title: "Cleared!",
            text: "The list has been cleared.",
            icon: "success",
            customClass: {
              htmlContainer: "swal2-text",
              popup: "swal2-popup",
              confirmButton: "swal2-text"
            }
          })
        }
      })
    } else {
      Swal.fire({
        title: "The list is already clear!",
        text: "¡Add some items to your packing list!",
        icon: "info",
        customClass: {
          htmlContainer: "swal2-text",
          popup: "swal2-popup",
          confirmButton: "swal2-text"
        }
      })
    }
  }

  return (
    <div className="app">
      <Logo />
      <Form items={items} addItem={handleAddItem} addItemQuantity={addItemQuantity} setItemFalse={setItemFalse} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} onClearList={handleClearList} />
      <Footer items={items} />
    </div>
  )
}