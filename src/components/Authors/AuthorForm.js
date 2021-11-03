import { ThemedButton, ThemedDiv, ThemedTextInput } from '../../shared/components/Styled';
import { TitleList } from '../../shared/components/Titles';

function AuthorForm({
  author = {},
  onSubmit = () => null,
  setValue,
  // selectedTitles,
  // onSelect
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(author);
      }}
      className="flex flex-col justify-start items-center w-11/12 mx-auto"
    >
      <ThemedTextInput
        value={author.name || ''}
        onChange={(e) => setValue({ name: e.target.value })}
        label="Name"
        id="author-name"
      />
      {!author.titles ? null : (
        <div>
          <TitleList titles={author.titles} />
        </div>
      )}
      <ThemedDiv
        className="flex flex-row justify-evenly items-center pb-4 pt-2 mt-3 px-2 border-t w-full"
      >
        <ThemedButton submits>
          Save Changes
        </ThemedButton>
      </ThemedDiv>
    </form>
  );
}

export default AuthorForm;
