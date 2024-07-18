import { useState } from 'react';
import Logo from "./Logo";
import Form from "./Form";
import PackingList from './PackingList';
import Stats from './Stats';
import VersionWatermark from './VersionWatermark';
import ItemsData from '../data/ItemsData';

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
    const confirmed = window.confirm("Are you sure you want to delete all items?")

    if (confirmed) {
      setItems([]);
    };
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