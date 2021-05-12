import { StyledTr } from './styled';

function TableRow({ children, onClick, className }) {
  return (
    <StyledTr onClick={onClick} className={`w-full ${className}`}>
      {children}
    </StyledTr>
  );
}

export default TableRow;
