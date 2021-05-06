import styled from 'styled-components';
import { getColourMap } from '../../themes';

const {
  secondary,
  text,
  primary
} = getColourMap();

const StyledTextArea = styled.textarea`
  background-color: ${secondary};
  color: ${text};
  border-color: ${primary};
`;

function LgTextArea({ value, onChange }) {
  return (
    <StyledTextArea
      className="border-2 p-1 m-2"
      rows={12}
      value={value}
      onChange={onChange}
    />
  );
}

export default LgTextArea;
