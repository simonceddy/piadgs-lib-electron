import { FlexCol } from '../../shared/components/Flex';
import { DefaultForm } from '../../shared/components/Forms';

// TODO handle multiple authors and subjects
function TitleForm({ children, onSubmit }) {
  return (
    <FlexCol className="w-full flex-1 justify-center items-center">
      <DefaultForm
        className="p-2 rounded-md"
        onSubmit={onSubmit}
      >
        {children}
      </DefaultForm>
    </FlexCol>
  );
}

export default TitleForm;
