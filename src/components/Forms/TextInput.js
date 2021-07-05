import { StyledInput } from '../../shared/components/Styled';

const TextInput = ({
  id, required = false, value, onChange = () => null, onKeyDown, className
}) => (
  <StyledInput
    onKeyDown={onKeyDown}
    type="text"
    required={required}
    id={id}
    value={value}
    className={`${className} m-1 border-2`}
    onChange={onChange}
  />
);

export default TextInput;
