import { StyledTr } from './styled';

function TableRow({ children, onClick }) {
  return (
    <StyledTr onClick={onClick} className="">
      {children}
    </StyledTr>
  );
}

export default TableRow;
