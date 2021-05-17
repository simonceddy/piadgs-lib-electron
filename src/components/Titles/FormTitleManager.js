import { FlexRow } from '../../shared/components/Flex';
import FlexCol from '../../shared/components/Flex/FlexCol';
import { ThemedButton } from '../../shared/components/Styled';
import FormTitleList from './FormTitleList';

function FormTitleManager({
  titles = [],
  onAddTitle = () => {}
}) {
  console.log(titles);
  return (
    <FlexCol className="justify-start items-center p-2">
      <FlexRow>
        <ThemedButton
          onClick={onAddTitle}
        >
          Add author&apos;s titles
        </ThemedButton>
      </FlexRow>
      <FormTitleList titles={titles} />
    </FlexCol>
  );
}

export default FormTitleManager;
