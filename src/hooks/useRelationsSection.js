import { useState } from 'react';

export default function useRelationsSection(initialItems = []) {
  const [currentItems, setCurrentItems] = useState(initialItems);

  const addItem = (item) => setCurrentItems([item, ...currentItems]);

  const removeItem = (item) => setCurrentItems(
    currentItems.filter((current) => current !== item)
  );

  return {
    currentItems,
    addItem,
    removeItem
  };
}
