import { useCallback } from 'react';
import { fromWorksCols } from '../../shared/data/columns';
import SubjectList from './SubjectList';

function ConvertedTitleRow({ title = {}, children }) {
  const Cells = useCallback(() => fromWorksCols.map(({ key }) => (
    <td
      className="my-1"
      key={`${key}-title-${title.id}`}
    >
      {key !== 'subjects'
        ? (title[key] || '')
        : <SubjectList subjects={title.subjects || []} />}
    </td>
  )), [title]);

  return (
    <tr>
      {children}
      <Cells />
    </tr>
  );
}

export default ConvertedTitleRow;
