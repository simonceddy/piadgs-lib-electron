/* eslint-disable no-unused-vars */
import { FormLabel, TextInput } from '../../components/Forms';
import useRelationsSection from '../../hooks/useRelationsSection';
import RemoveButton from '../../components/Interactive/RemoveButton';
import useInputSuggestions from '../../hooks/useInputSuggestions';

const suggestAuthors = (input, setter) => {
  switch (input) {
    case 'edd':
      return setter([
        { surname: 'eddy', given_names: 'simon' },
        { surname: 'eddo' },
        { surname: 'eddu' },
        { surname: 'eddmas' },
        { surname: 'eddying' }
      ]);
    case 'test':
      return setter([
        { surname: 'testy' },
        { surname: 'testo' },
        { surname: 'testu' },
        { surname: 'testmas', given_names: 'docker' },
        { surname: 'testying' }
      ]);
    default:
      return setter([]);
  }
};

// TODO transform author input
function ManageAuthors({ authors = [] }) {
  const { currentItems, addItem, removeItem } = useRelationsSection(authors);
  const { input, setInput, suggestions } = useInputSuggestions(suggestAuthors);

  return (
    <form
      className="flex flex-col justify-start items-start m-2 border-2 rounded-xl p-2 interactive-form h-full"
      onSubmit={(e) => {
        e.preventDefault();

        const trimmed = input.trim();
        if (trimmed.length > 0) {
          console.log('add author');
          addItem({ surname: trimmed });
          setInput('');
        }
      }}
    >
      <FormLabel htmlFor="author-input" className="relative flex-col justify-start items-start">
        <span>Author</span>
        <TextInput
          id="author-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <ul className="absolute top-full left-0 flex flex-col justify-start items-start w-full dark:bg-black dark:text-green-200 bg-green text-blue-500">
          {suggestions.length > 0 ? suggestions.map((suggestion, index) => (
            <li
              key={`suggestion-${index}`}
              className="flex flex-row w-full justify-start items-center"
              onClick={() => {
                addItem(suggestion);
                setInput('');
              }}
              role="presentation"
            >
              {suggestion.surname}{suggestion.given_names ? `, ${suggestion.given_names}` : null}
            </li>
          )) : null}
        </ul>
      </FormLabel>
      <ul className="h-32 overflow-scroll w-full flex flex-col justify-start items-start">
        {currentItems.map((author, index) => (
          <li key={`author-${index}`} className="flex flex-row w-full justify-between items-center">
            <span>
              {author.surname}{author.given_names ? `, ${author.given_names}` : null}
            </span>
            <RemoveButton onClick={() => removeItem(author)}>
              Remove
            </RemoveButton>
          </li>
        ))}
      </ul>
    </form>
  );
}

export default ManageAuthors;
