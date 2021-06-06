/* eslint-disable no-unused-vars */
import { useMemo, useState } from 'react';
import TitleSubformItem from '../../components/Titles/TitlesSubForm/TitleSubformItem';
import useTitlesSubForm from '../../hooks/useTitlesSubForm';

function TitlesSubForm({
  titles = []
}) {
  const { selectedTitles, handleSelectTitle } = useTitlesSubForm(titles);

  return (
    <ul
      className="flex flex-col justify-start items-start w-full"
    >
      {selectedTitles.map((title = {}) => (
        <li key={title.id} className="flex flex-row justify-between items-center w-full">
          <TitleSubformItem title={title} />
          <input
            type="checkbox"
            checked={selectedTitles[title.id]}
            onChange={() => handleSelectTitle(title.id)}
          />
        </li>
      ))}
    </ul>
  );
}

export default TitlesSubForm;
