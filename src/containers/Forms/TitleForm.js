/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { FormLabel, TextInput } from '../../components/Forms';
import RelationsSubform from '../../components/Forms/RelationsSubform';
import useInputSuggestions from '../../hooks/useInputSuggestions';
import useRelationsSection from '../../hooks/useRelationsSection';
import titleFields from '../../shared/data/titleFields';
import ManageAuthors from './ManageAuthors';
import ManageSubjects from './ManageSubjects';

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

const suggestSubjects = (input, setter) => {
  switch (input) {
    case 'edd':
      return setter([
        { name: 'eddy' },
        { name: 'eddo' },
        { name: 'eddu' },
        { name: 'eddmas' },
        { name: 'eddying' }
      ]);
    case 'test':
      return setter([{ name: 'testy' }, { name: 'testo' }, { name: 'testu' }, { name: 'testmas' }, { name: 'testying' }]);
    default:
      return setter([]);
  }
};

const renderAuthor = (author = {}) => (
  <span>
    {author.surname}{author.given_names ? `, ${author.given_names}` : null}
  </span>
);

const renderSubject = (subject = {}) => (
  <span>{subject.name}</span>
);

function TitleForm({ persistTitle = () => null }) {
  const [values, setValues] = useState({
    title: '',
    imprint: '',
    isbn: ''
  });

  const {
    currentItems: currentAuthors,
    addItem: addAuthor,
    removeItem: removeAuthor
  } = useRelationsSection([]);

  const {
    input: authorInput,
    setInput: setAuthorInput,
    suggestions: authorSuggestions
  } = useInputSuggestions(suggestAuthors);

  const {
    currentItems: currentSubjects,
    addItem: addSubject,
    removeItem: removeSubject
  } = useRelationsSection([]);
  const {
    input: subjectInput,
    setInput: setSubjectInput,
    suggestions: subjectSuggestions
  } = useInputSuggestions(suggestSubjects);

  return (
    <>
      <div className="flex flex-row justify-start items-start flex-wrap">
        <RelationsSubform
          title="authors"
          input={authorInput}
          setInput={setAuthorInput}
          currentItems={currentAuthors}
          addItem={(author) => {
            if (typeof author === 'string') {
              return addAuthor({ surname: author });
            }
            return addAuthor(author);
          }}
          removeItem={removeAuthor}
          renderItem={renderAuthor}
          suggestions={authorSuggestions}
          renderSuggestion={renderAuthor}
        />
        <form
          className="flex flex-col flex-wrap flex-1 justify-start items-start m-2 border-2 rounded-xl h-full p-2 interactive-form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {titleFields.map(({ key, name, required = false }) => (
            <FormLabel
              htmlFor={`${key}-input`}
              key={`${key}-input`}
              className="flex-row w-full items-center justify-between"
            >
              <span>{name}</span>
              <TextInput
                required={required}
                id={`${key}-input`}
                value={values[key]}
                onChange={(e) => setValues({ ...values, [key]: e.target.value })}
              />
            </FormLabel>
          ))}
        </form>
        <RelationsSubform
          title="subjects"
          input={subjectInput}
          setInput={setSubjectInput}
          currentItems={currentSubjects}
          addItem={(subject) => {
            if (typeof subject === 'string') {
              return addSubject({ name: subject });
            }
            return addSubject(subject);
          }}
          removeItem={removeSubject}
          renderItem={renderSubject}
          renderSuggestion={renderSubject}
          suggestions={subjectSuggestions}
        />
      </div>
      <div className="flex flex-row p-2 m-2">
        <button
          className="hover:underline border-2 border-green-600 dark:border-green-300 text-green-600 dark:text-green-300 bg-white dark:bg-black p-1 text-xl rounded-xl dark:hover:bg-green-300 dark:hover:text-black hover:bg-green-600 hover:text-white"
          type="button"
          onClick={(e) => {
            persistTitle({
              ...values,
              authors: currentAuthors,
              subjects: currentSubjects
            });
          }}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default TitleForm;
