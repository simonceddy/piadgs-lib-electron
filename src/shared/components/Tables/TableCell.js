import { StyledTd } from './styled';

function TableCell({
  children,
  onDoubleClick,
  className,
  colSpan
}) {
  return (
    <StyledTd
      colSpan={colSpan}
      onDoubleClick={onDoubleClick}
      role="presentation"
      className={`py-0.5 px-1 border ${className}`}
    >
      {children}
    </StyledTd>
  );
}

export default TableCell;
