import { useMemo, useState } from 'react';

const getSelectedTitles = (titles = []) => Object.fromEntries(
  titles.map((title) => ([title.id, true]))
);

export default function useTitlesSubForm(titles = []) {
  const initialSelectedTitles = useMemo(
    () => getSelectedTitles(titles),
    [titles]
  );

  const [selectedTitles, setSelectedTitles] = useState(initialSelectedTitles);

  const handleSelectTitle = (id) => setSelectedTitles({
    ...selectedTitles,
    [id]: !selectedTitles[id]
  });

  const resetState = () => setSelectedTitles(initialSelectedTitles);

  return {
    selectedTitles,
    handleSelectTitle,
    resetState
  };
}
