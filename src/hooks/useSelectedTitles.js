import { useCallback, useMemo, useState } from 'react';

const getSelectedTitles = (titles = []) => Object.fromEntries(
  titles.map((title) => ([title.id, true]))
);

const applySelectedToAll = (ids = [], selected = true) => Object.fromEntrie(
  ids.map((id) => ([id, selected]))
);

export default function useSelectedTitles(titles = []) {
  const initialSelectedTitles = useMemo(
    () => getSelectedTitles(titles),
    [titles]
  );

  const [selectedTitles, setSelectedTitles] = useState(initialSelectedTitles);

  const handleSelectTitle = (id) => setSelectedTitles({
    ...selectedTitles,
    [id]: !selectedTitles[id]
  });

  const selectAll = () => useCallback(setSelectedTitles(
    applySelectedToAll(Object.keys(selectedTitles))
  ), [initialSelectedTitles]);
  const selectNone = () => useCallback(setSelectedTitles(
    applySelectedToAll(Object.keys(selectedTitles), false)
  ), [initialSelectedTitles]);

  const resetState = () => setSelectedTitles(initialSelectedTitles);

  return {
    selectedTitles,
    handleSelectTitle,
    selectAll,
    selectNone,
    resetState,
  };
}
