// import { useState } from 'react';
import RelationsSubform from '../../components/Forms/RelationsSubform';
import useInputSuggestions from '../../hooks/useInputSuggestions';
import useRelationsSection from '../../hooks/useRelationsSection';
import { searchLibrarySubjects } from '../../message-control/controllers';

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

const renderSubject = (subject = {}) => (
  <span>
    {subject.name}
  </span>
);

function TitleSubjects({
  input,
  subjects = [],
  onAddSubject,
  onRemoveSubject
}) {
  const {
    currentItems: currentSubjects,
    addItem,
    removeItem
  } = useRelationsSection(subjects || []);

  const {
    input: subjectInput,
    setInput: setsubjectInput,
    suggestions: Subjectsuggestions
  } = useInputSuggestions(suggestSubjects, input || '');

  const addsubject = (subject) => {
    if (typeof subject === 'string') {
      addItem({ name: subject });
    } else {
      addItem(subject);
    }
    if (onAddSubject && typeof onAddSubject === 'function') onAddSubject(subject);
  };

  const removesubject = (subject) => {
    removeItem(subject);
    if (onRemoveSubject && typeof onRemoveSubject === 'function') onRemoveSubject(subject);
  };

  return (
    <RelationsSubform
      title="Subjects"
      input={subjectInput}
      setInput={setsubjectInput}
      currentItems={currentSubjects}
      addItem={addsubject}
      removeItem={removesubject}
      renderItem={renderSubject}
      suggestions={Subjectsuggestions}
      renderSuggestion={renderSubject}
    />
  );
}

export default TitleSubjects;
