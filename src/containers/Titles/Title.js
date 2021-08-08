import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import { connect } from 'react-redux';
import TitleForm from '../../components/Titles/TitleForm';
import TitleWindow from '../../components/Titles/TitleWindow';
import {
  addTitleAuthor,
  addTitleSubject,
  deleteTitle,
  deleteTitleAuthor,
  deleteTitleSubject,
  // getLibraryTitle,
  updateTitle
} from '../../message-control/controllers/titleControllers';
import { FlexRow } from '../../shared/components/Flex';
import ModalAppletLayout from '../../shared/components/Layout/ModalAppletLayout';
import { ThemedButton, ThemedDiv } from '../../shared/components/Styled';
import { setTitleFormValues } from '../../store/actions/admin/titleFormActions';
import TitleAuthors from '../Authors/TitleAuthors';
import TitleSubjects from '../Subjects/TitleSubjects';

// TODO fix unmounted state update error
function Title({
  title = {},
  onClose,
  onTitleChange,
  isEditing = false,
  setIsEditing = () => {},
  values = {},
  setValues = () => {}
}) {
  // TODO maintain updated data when calling notify
  // TODO fix state nightmare - use Redux code already in place
  // - set and get values from redux state,
  // - add/remove relations using redux state
  // const [values, setValues] = useState(title);
  const [statusMessage, setStatusMessage] = useState(null);
  // console.log(values);

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
      // console.log(result);
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
        setIsEditing(false);
        return setStatusMessage('Successfully saved changes!');
      });
  };

  useEffect(() => {
    if (values.id !== title.id) setValues(title);
  }, [title]);

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
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Stop Editing' : 'Edit'}
            </ThemedButton>
            <ThemedButton
              onClick={onClose}
            >
              Close
            </ThemedButton>
          </ThemedDiv>
          {isEditing
            ? (
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
                  onDelete={() => onDelete(title.id)}
                />
                <TitleSubjects
                  onAddSubject={addSubject}
                  onRemoveSubject={removeSubject}
                  subjects={values.subjects || []}
                />
              </FlexRow>
            )
            : (
              <TitleWindow title={values} />
            )}
        </>
      ) : null}
    </ModalAppletLayout>
  );
}

const mapStateToProps = (state) => ({
  values: state.titles.title.values
});

const mapDispatchToProps = (dispatch) => ({
  setValues: (values) => dispatch(setTitleFormValues(values))
});

export default connect(mapStateToProps, mapDispatchToProps)(Title);
