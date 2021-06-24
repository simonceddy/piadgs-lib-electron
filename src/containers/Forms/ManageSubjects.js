/* eslint-disable no-unused-vars */
import { FormLabel, TextInput } from '../../components/Forms';
import RemoveButton from '../../components/Interactive/RemoveButton';
import useInputSuggestions from '../../hooks/useInputSuggestions';
import useRelationsSection from '../../hooks/useRelationsSection';

const suggestSubjects = (input, setter) => {
  switch (input) {
    case 'edd':
      return setter(['eddy', 'eddo', 'eddu', 'eddmas', 'eddying']);
    case 'test':
      return setter(['testy', 'testo', 'testu', 'testmas', 'testying']);
    default:
      return setter([]);
  }
};

function ManageSubjects({ subjects = [] }) {
  const { currentItems, addItem, removeItem } = useRelationsSection(subjects);
  const { input, setInput, suggestions } = useInputSuggestions(suggestSubjects);

  return (
    <form
      className="flex flex-col justify-start items-start m-2 border-2 rounded-xl p-2 interactive-form h-full"
      onSubmit={(e) => {
        e.preventDefault();

        const trimmed = input.trim();
        if (trimmed.length > 0) {
          console.log('add subject');
          addItem(trimmed);
          setInput('');
        }
      }}
    >
      <div className="w-full relative">
        <FormLabel htmlFor="subject-input" className="justify-start items-start flex-col">
          <span>Subjects</span>
          <TextInput
            id="subject-input"
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
              {suggestion}
            </li>
          )) : null}
        </ul>
      </div>
      <ul className="h-32 overflow-scroll w-full flex flex-col justify-start items-start">
        {currentItems.map((subject, index) => (
          <li key={`subject-${index}`} className="flex flex-row w-full justify-between items-center">
            <span>
              {subject}
            </span>
            <RemoveButton onClick={() => removeItem(subject)}>
              Remove
            </RemoveButton>
          </li>
        ))}
      </ul>
    </form>
  );
}

export default ManageSubjects;
