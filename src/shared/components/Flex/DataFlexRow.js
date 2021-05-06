import styled from 'styled-components';
import { FlexRow } from '.';

const StyledFlexRow = styled(FlexRow)`
  &:hover {
    .data-label {
      text-decoration: underline;
    }
  }
`;

function DataFlexRow({ children, label }) {
  return (
    <StyledFlexRow className="justify-between items-start my-0.5 p-0.5 w-full">
      {label ? <span className="data-label capitalize mr-2 font-bold">{label}</span> : null}
      <div>
        {children}
      </div>
    </StyledFlexRow>
  );
}

export default DataFlexRow;
