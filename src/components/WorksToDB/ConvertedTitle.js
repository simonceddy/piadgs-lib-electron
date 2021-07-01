import { useCallback } from 'react';
// import { FlexCol } from '../../shared/components/Flex';
import { ThemedDiv } from '../../shared/components/Styled';
import './ConvertedTitle.css';
import SubjectList from './SubjectList';
import { fromWorksCols } from '../../shared/data/columns';

function ConvertedTitle({ title = {}, children }) {
  const Data = useCallback(() => fromWorksCols.map(({ key, name }) => (
    <span
      className="w-full justify-between items-start flex flex-row my-1"
      key={`${key}-section`}
    >
      <span className="mr-2">{name}:</span>
      <span className="ml-1 flex-1">
        {key !== 'subjects'
          ? (title[key] || '')
          : <SubjectList subjects={title.subjects || []} />}
      </span>
    </span>
  )), [title]);

  return (
    <ThemedDiv className="flex flex-col justify-start items-start converted-title-container border-2 rounded-lg px-2 py-1 mb-2">
      {children}
      <Data />
    </ThemedDiv>
  );
}

export default ConvertedTitle;
