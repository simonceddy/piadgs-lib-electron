import { useState } from 'react';
import { connect } from 'react-redux';
import TitleForm from '../../components/Titles/TitleForm';
import {
  addTitleAuthor,
  addTitleSubject,
  deleteTitle,
  deleteTitleAuthor,
  deleteTitleSubject,
  updateTitle
} from '../../message-control/controllers/titleControllers';
import { FlexRow } from '../../shared/components/Flex';
import DeleteForm from '../../shared/components/Forms/DeleteForm';
import ModalAppletLayout from '../../shared/components/Layout/ModalAppletLayout';
import { ThemedButton, ThemedDiv } from '../../shared/components/Styled';
import TitleAuthors from '../Authors/TitleAuthors';
import TitleSubjects from '../Subjects/TitleSubjects';

function Title({
  title = {},
  onClose,
  onTitleChange
}) {
  // TODO maintain updated data when calling notify
  const [statusMessage, setStatusMessage] = useState(null);
  const [values, setValues] = useState(title);

  const notify = (message) => {
    if (typeof onTitleChange === 'function') {
      onTitleChange(message);
    }
  };

  const addAuthor = (author = {}) => addTitleAuthor(title.id, author.id)
    .then((result) => {
      setValues({
        ...values,
        authors: [author, ...values.authors]
      });
      notify(result);
    });

  const addSubject = (subject = {}) => addTitleSubject(title.id, subject.id)
    .then((result) => {
      setValues({
        ...values,
        subjects: [subject, ...values.subjects]
      });
      notify(result);
    });

  const removeAuthor = (author = {}) => deleteTitleAuthor(title.id, author.id)
    .then((result) => {
      setValues({
        ...values,
        authors: values.authors.filter((a) => a !== author)
      });
      notify(result);
    });

  const removeSubject = (subject = {}) => deleteTitleSubject(title.id, subject.id)
    .then((result) => {
      setValues({
        ...values,
        subjects: values.subjects.filter((s) => s !== subject)
      });
      notify(result);
    });

  const onDelete = (id) => deleteTitle(id)
    .then((result) => {
      if (result.success) {
        setValues({});
        setStatusMessage('Successfully deleted title');
        notify(result);
      } else {
        setStatusMessage('An error occurred while attempting deletion.');
      }
    });

  const submitChanges = () => {
    updateTitle(values)
      .then((result) => {
        console.log(result);
        if (result.result !== 1) {
          return setStatusMessage('An error occurred trying to save changes!');
        }
        notify(result);
        // setIsEditing(false);
        return setStatusMessage('Successfully saved changes!');
      });
  };

  return (
    <ModalAppletLayout>
      {statusMessage ? (
        <span role="presentation" onClick={() => setStatusMessage(null)}>
          {statusMessage}
        </span>
      ) : null}
      {values.title ? (
        <>
          <ThemedDiv className="flex flex-row p-2 justify-between items-center">

            <ThemedButton
              onClick={onClose}
            >
              Close
            </ThemedButton>
            <DeleteForm onDelete={() => onDelete(title.id)} />
          </ThemedDiv>

          <FlexRow>
            <TitleAuthors
              onAddAuthor={addAuthor}
              onRemoveAuthor={removeAuthor}
              authors={values.authors || []}
            />
            <TitleForm
              values={values}
              setValues={(vals) => setValues(vals)}
              onSubmit={submitChanges}
            />
            <TitleSubjects
              onAddSubject={addSubject}
              onRemoveSubject={removeSubject}
              subjects={values.subjects || []}
            />
          </FlexRow>
        </>
      ) : null}
    </ModalAppletLayout>
  );
}

export default connect()(Title);
