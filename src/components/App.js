import Logo from "./Logo";
import Form from "./Form";
import Stats from './Stats';
import Swal from "sweetalert2";
import { useState } from 'react';
import PackingList from './PackingList';
import ItemsData from '../data/ItemsData';
import VersionWatermark from './VersionWatermark';

const initialItems = new Array(ItemsData.items.length);
ItemsData.items.forEach(element => {
  initialItems[element.id] = ([element.id, element.description, element.quantity, element.packed]);
});

export default function App() {
  const [items, setItems] = useState(initialItems);

  function handleAddItems(item) {
    setItems(items => [...items, item]);
  };

  function handleDeleteItem(id) {
    setItems(items => items.filter(item => item[0] !== id));
  };

  function handleToggleItem(id) {
    setItems(items => items.map(item => item[0] === id ? { ...item, 3: !item[3] } : item));
  };

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
          setItems([]);
          Swal.fire({
            title: "Cleared!",
            text: "The list has been cleared.",
            icon: "success",
            customClass: {
              htmlContainer: "swal2-text",
              popup: "swal2-popup",
              confirmButton: "swal2-text"
            }
          });
        }
      });
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
      });
    }
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} onClearList={handleClearList} />
      <Stats items={items} />
      <VersionWatermark />
    </div>
  );
};