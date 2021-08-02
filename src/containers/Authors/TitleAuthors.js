// import { useState } from 'react';
import RelationsSubform from '../../components/Forms/RelationsSubform';
import useInputSuggestions from '../../hooks/useInputSuggestions';
import useRelationsSection from '../../hooks/useRelationsSection';
import { searchLibraryAuthors } from '../../message-control/controllers';

const suggestAuthors = (input, setter) => searchLibraryAuthors({
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
    {author.surname}{author.given_names ? `, ${author.given_names}` : null}
  </span>
);

function TitleAuthors({
  input,
  authors = [],
  onAddAuthor,
  onRemoveAuthor
}) {
  const {
    currentItems: currentAuthors,
    addItem,
    removeItem
  } = useRelationsSection(authors || []);

  const {
    input: authorInput,
    setInput: setAuthorInput,
    suggestions: authorSuggestions
  } = useInputSuggestions(suggestAuthors, input || '');

  const addAuthor = (author) => {
    if (typeof author === 'string') {
      addItem({ surname: author });
    } else {
      addItem(author);
    }
    if (onAddAuthor && typeof onAddAuthor === 'function') onAddAuthor(author);
  };

  const removeAuthor = (author) => {
    removeItem(author);
    if (onRemoveAuthor && typeof onRemoveAuthor === 'function') onRemoveAuthor(author);
  };

  return (
    <RelationsSubform
      title="authors"
      input={authorInput}
      setInput={setAuthorInput}
      currentItems={currentAuthors}
      addItem={addAuthor}
      removeItem={removeAuthor}
      renderItem={renderAuthor}
      suggestions={authorSuggestions}
      renderSuggestion={renderAuthor}
    />
  );
}

export default TitleAuthors;
