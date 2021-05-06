import { ThemedTextInput } from '../../shared/components/Styled';

function SubjectNameField({ value, setValue = () => null }) {
  return (
    <ThemedTextInput
      label="Edit Subject title:"
      name="subject-name"
      id="subject-name"
      className="p-2 border-2 rounded-xl text-xl flex-1"
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default SubjectNameField;
