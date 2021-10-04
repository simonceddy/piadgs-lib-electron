import { ThemedButton, ThemedTextInput } from '../../shared/components/Styled';
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
      <div>
        <ThemedButton submits>
          Save Changes
        </ThemedButton>
      </div>
    </form>
  );
}

export default AuthorForm;
