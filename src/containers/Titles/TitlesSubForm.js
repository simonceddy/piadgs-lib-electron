/* eslint-disable no-unused-vars */
import { useMemo, useState } from 'react';
import TitleSubformItem from '../../components/Titles/TitlesSubForm/TitleSubformItem';
import useSelectedTitles from '../../hooks/useSelectedTitles';

function TitlesSubForm({
  titles = []
}) {
  const { selectedTitles, handleSelectTitle } = useSelectedTitles(titles);
  console.log(selectedTitles);

  const titleList = useMemo(() => titles.map((title = {}) => (
    <li key={title.id} className="flex flex-row justify-between items-center w-full">
      <TitleSubformItem title={title} />
      <input
        type="checkbox"
        checked={selectedTitles[title.id]}
        onChange={() => handleSelectTitle(title.id)}
      />
    </li>
  )), [titles]);

  if (titles.length < 1) {
    return null;
  }

  return (
    <ul
      className="flex flex-col justify-start items-start w-full"
    >
      {titleList}
    </ul>
  );
}

export default TitlesSubForm;
