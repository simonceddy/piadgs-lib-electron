/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormLabel, TextInput } from '../../components/Forms';
import RelationsSubform from '../../components/Forms/RelationsSubform';
import useInputSuggestions from '../../hooks/useInputSuggestions';
import useRelationsSection from '../../hooks/useRelationsSection';
import { createTitle, searchLibraryAuthors, searchLibrarySubjects } from '../../message-control/controllers';
import titleFields from '../../shared/data/titleFields';
import ThemedButton from '../../shared/components/Styled/ThemedButton';
import { FlexRow } from '../../shared/components/Flex';

const initialValues = Object.fromEntries(titleFields.map(({ key }) => [key, '']));

const suggestAuthors = (input, setter) => searchLibraryAuthors({
  name: input
})
  .then(({ results }) => {
    if (results) {
      return setter(results);
    }
    return setter([]);
  })
  .catch(console.error);

const suggestSubjects = (input, setter) => searchLibrarySubjects({
  name: input
})
  .then(({ results }) => {
    if (results) {
      return setter(results);
    }
    return setter([]);
  })
  .catch(console.log);

const renderAuthor = (author = {}) => (
  <span>
    {author.name}
  </span>
);

const renderSubject = (subject = {}) => (
  <span>{subject.name}</span>
);

function TitleForm(/* { persistTitle = () => null } */) {
  const history = useHistory();

  const [values, setValues] = useState(initialValues);

  const [statusMessage, setStatusMessage] = useState(null);
  // TODO persist functions
  // TODO check if inputs are not empty for authors, subjects and use input

  const {
    currentItems: currentAuthors,
    addItem: addAuthor,
    removeItem: removeAuthor,
    clearItems: clearAuthors
  } = useRelationsSection([]);

  const {
    input: authorInput,
    setInput: setAuthorInput,
    suggestions: authorSuggestions
  } = useInputSuggestions(suggestAuthors);

  const {
    currentItems: currentSubjects,
    addItem: addSubject,
    removeItem: removeSubject,
    clearItems: clearSubjects
  } = useRelationsSection([]);
  const {
    input: subjectInput,
    setInput: setSubjectInput,
    suggestions: subjectSuggestions
  } = useInputSuggestions(suggestSubjects);

  const onSubmit = () => {
    createTitle({
      ...values,
      authors: currentAuthors,
      subjects: currentSubjects
    })
      .then((result) => {
        // console.log(result);
        if (result.success) {
          setValues(initialValues);
          clearSubjects();
          clearAuthors();
          return setStatusMessage('Successfully saved title!');
        }
        return setStatusMessage('An error occurred while trying to save.');
      });
  };

  return (
    <div className="flex flex-col justify-start items-center w-full h-full">
      <FlexRow className="justify-start items-center w-full">
        <ThemedButton
          className="mx-1"
          onClick={() => history.push('/titles')}
        >
          View Titles
        </ThemedButton>
      </FlexRow>
      {statusMessage ? (
        <div role="presentation">
          {statusMessage}
          <ThemedButton
            type="button"
            className="ml-3"
            onClick={() => setStatusMessage(null)}
          >
            X
          </ThemedButton>
        </div>
      ) : null}
      <div className="flex flex-row justify-start items-start flex-wrap">
        <RelationsSubform
          title="authors"
          input={authorInput}
          setInput={setAuthorInput}
          currentItems={currentAuthors}
          addItem={(author) => {
            if (typeof author === 'string') {
              return addAuthor({ name: author });
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
              <span className="capitalize">{name}</span>
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
          onClick={onSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default TitleForm;
