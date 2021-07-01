import { FlexRow } from '../../shared/components/Flex';
import { ThemedButton } from '../../shared/components/Styled';

function TitleButtons({
  title = {},
  persistTitle = () => {},
  removeTitle = () => {}
}) {
  return (
    <FlexRow className="justify-evenly items-center w-full">
      <ThemedButton
        className="m-1"
        onClick={() => console.log('edit', title.id)}
      >
        Edit
      </ThemedButton>
      <ThemedButton
        className="m-1"
        onClick={() => {
          if (typeof persistOne === 'function') persistTitle(title);
        }}
      >
        Save
      </ThemedButton>
      <ThemedButton
        className="m-1"
        onClick={() => removeTitle(title.id)}
      >
        Remove
      </ThemedButton>
    </FlexRow>
  );
}

export default TitleButtons;
