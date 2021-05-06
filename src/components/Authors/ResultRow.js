import { StyledHoverableRow } from '../../shared/components/Styled';

function ResultRow({ author = {}, columns = [], onClick }) {
  return (
    <StyledHoverableRow
      id={`author-${author.id}`}
      onClick={onClick}
      className="w-full"
    >
      {columns.map(({ key }) => (
        <td
          className="border"
          key={`${author.id}-${key}`}
        >
          {author[key] || ''}
        </td>
      ))}
      <td className="border">{author.titles ? author.titles.length : 0} titles</td>
    </StyledHoverableRow>
  );
}

export default ResultRow;
