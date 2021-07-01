import { FlexCol } from '../../shared/components/Flex';
import { StyledTextarea } from '../../shared/components/Styled';

function InputTextarea({ value, setValue = () => null, placeholder }) {
  return (
    <FlexCol className="w-full justify-center items-center">
      <StyledTextarea
        className="p-2 rounded-xl border-2 text-lg w-full"
        value={value}
        rows={12}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
      />
    </FlexCol>
  );
}

export default InputTextarea;
