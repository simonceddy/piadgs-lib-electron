import { ThemedButton, ThemedTextInput } from '../../shared/components/Styled';

function AuthorForm({
  author = {},
  onSubmit = () => null,
  setValue,
  selectedTitles,
  onSelect
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
        value={author.surname}
        onChange={(e) => setValue({ surname: e.target.value })}
        label="Surname"
        id="author-surname"
      />
      <ThemedTextInput
        value={author.given_names}
        onChange={(e) => setValue({ given_names: e.target.value })}
        label="Given Names"
        id="author-given-names"
      />
      {!author.titles ? null : (
        <div>
          <span>
            Titles:
          </span>
          {author.titles.map((title = {}) => (
            <ThemedTextInput
              label={title.title}
              name={`title-subject-${title.id}`}
              id={`title-subject-${title.id}`}
              type="checkbox"
              className="ml-2 p-2"
              value={title.id}
              checked={selectedTitles[title.id] === true}
              onChange={() => onSelect(title.id)}
            />
          ))}
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
