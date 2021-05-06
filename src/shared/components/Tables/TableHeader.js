import { StyledTh } from './styled';

function TableHeader({
  children,
  onClick,
  id,
  sortingBy = false,
  sortDirection = '',
  className = ''
}) {
  const sortArrow = sortDirection === 'ASC' ? '↑' : '↓';

  return (
    <StyledTh
      className={`border capitalize ${sortingBy ? 'sorting-by' : null} ${className}`}
      onClick={onClick}
      id={id}
    >
      <span className="" />
      {children}
      {sortingBy ? ` ${sortArrow}` : null}
    </StyledTh>
  );
}

export default TableHeader;
