import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Messages from '../../components/Messages';
import TitleForm from '../../components/Titles/TitleForm';
import {
  addTitleAuthor,
  addTitleSubject,
  deleteTitle,
  deleteTitleAuthor,
  deleteTitleSubject,
  updateTitle,
  getLibraryTitle
} from '../../message-control/controllers/titleControllers';
import { FlexRow } from '../../shared/components/Flex';
import DeleteForm from '../../shared/components/Forms/DeleteForm';
import { ThemedButton, ThemedDiv } from '../../shared/components/Styled';
import TitleAuthors from '../Authors/TitleAuthors';
import TitleSubjects from '../Subjects/TitleSubjects';

function Title({
  titleId,
  // onClose,
  // onTitleChange
}) {
  const history = useHistory();
  const [statusMessage, setStatusMessage] = useState(null);
  const [isDeleted/* , setIsDeleted */] = useState(false);
  const [values, setValues] = useState({});

  useEffect(() => {
    if (!isDeleted && titleId) {
      getLibraryTitle({ id: titleId }).then((data) => setValues(data));
    }
  }, [titleId]);

  // const notify = (message) => {
  //   if (typeof onTitleChange === 'function') {
  //     onTitleChange(message);
  //   }
  // };

  const addAuthor = (author = {}) => {
    if (typeof author === 'object') {
      // Existing author
      return addTitleAuthor(
        titleId,
        author.id
      )
        .then((result) => {
          console.log(result);
          setValues({
            ...values,
            authors: [author, ...values.authors]
          });
        // notify(result);
        });
    }

    // New author
    console.log(author);
    return addTitleAuthor(
      titleId,
      null,
      author
    )
      .then((result) => {
        console.log(result);
        setValues({
          ...values,
          authors: [{ name: author, id: result.authorId }, ...values.authors]
        });
      // notify(result);
      });
  };

  const addSubject = (subject = {}) => addTitleSubject(
    titleId,
    subject.id || null,
    typeof subject === 'string' ? subject : null
  )
    .then((result) => {
      console.log(result);
      setValues({
        ...values,
        subjects: [subject, ...values.subjects]
      });
      // notify(result);
    });

  const removeAuthor = (author = {}) => deleteTitleAuthor(titleId, author.author_id)
    .then((result) => {
      console.log(result);
      setValues({
        ...values,
        authors: values.authors.filter((a) => a !== author)
      });
      // notify(result);
    });

  const removeSubject = (subject = {}) => deleteTitleSubject(titleId, subject.id)
    .then((result) => {
      console.log(result);
      setValues({
        ...values,
        subjects: values.subjects.filter((s) => s !== subject)
      });
      // notify(result);
    });

  const onDelete = (id) => deleteTitle(id)
    .then((result) => {
      if (result.success) {
        setValues({});
        setStatusMessage('Successfully deleted title');
        // notify(result);
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
        // notify(result);
        // setIsEditing(false);
        return setStatusMessage('Successfully saved changes!');
      });
  };

  return (
    <ThemedDiv
      className="w-full max-h-full flex flex-col justify-between items-center z-10 flex-1 p-4 rounded-xl relative"
    >
      {statusMessage ? (
        <Messages
          clearMessage={() => setStatusMessage(null)}
          message={statusMessage}
        />
      ) : null}
      <ThemedDiv className="flex flex-row p-2 justify-between items-center">
        <ThemedButton
          onClick={() => history.goBack()}
        >
          Back
        </ThemedButton>
      </ThemedDiv>
      {values.title ? (
        <>
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
          <FlexRow>
            <DeleteForm onDelete={() => onDelete(titleId)} />
          </FlexRow>
        </>
      ) : null}
    </ThemedDiv>
  );
}

export default connect()(Title);
