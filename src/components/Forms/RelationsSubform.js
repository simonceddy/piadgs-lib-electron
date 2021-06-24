import RemoveButton from '../Interactive/RemoveButton';
import FormLabel from './FormLabel';
import TextInput from './TextInput';

function RelationsSubform({
  input = '',
  addItem = () => null,
  removeItem = () => null,
  setInput = () => null,
  suggestions = [],
  renderSuggestion,
  renderItem,
  currentItems = [],
  title
}) {
  return (
    <form
      className="flex flex-col justify-start items-start m-2 border-2 rounded-xl p-2 interactive-form h-full"
      onSubmit={(e) => {
        e.preventDefault();

        const trimmed = input.trim();

        if (trimmed.length > 0) {
          addItem(trimmed);
          setInput('');
        }
      }}
    >
      <div className="w-full relative">
        <FormLabel htmlFor="subform-input" className="justify-start items-start flex-col">
          {title ? <span className="capitalize">{title}</span> : null}
          <TextInput
            id="subform-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </FormLabel>
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
              {renderSuggestion ? renderSuggestion(suggestion) : suggestion}
            </li>
          )) : null}
        </ul>
      </div>
      <ul className="h-32 overflow-scroll w-full flex flex-col justify-start items-start">
        {currentItems.map((item, index) => (
          <li key={`item-${index}`} className="flex flex-row w-full justify-between items-center">
            <span>
              {renderItem ? renderItem(item) : item}
            </span>
            <RemoveButton onClick={() => removeItem(item)}>
              Remove
            </RemoveButton>
          </li>
        ))}
      </ul>
    </form>
  );
}

export default RelationsSubform;
