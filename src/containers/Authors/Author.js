import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import AuthorForm from '../../components/Authors/AuthorForm';
import MessageBox from '../../components/Authors/MessageBox';
import { deleteAuthor, getLibraryAuthor } from '../../message-control/controllers';
import DeleteForm from '../../shared/components/Forms/DeleteForm';
import ModalAppletLayout from '../../shared/components/Layout/ModalAppletLayout';
import { ThemedButton, ThemedDiv } from '../../shared/components/Styled';
import {
  setAuthorMessage,
  setSelectedTitles,
  updateAuthor
} from '../../store/actions';

function Author({
  authorId,
  selectedTitles,
  setTitles,
  message,
  setMessage,
  onClose,
  submitForm = () => {},
  onDataChange
}) {
  const [isDeleted/* , setIsDeleted */] = useState(false);
  // const [values, setValues] = useState({});
  const [values, setValues] = useState({});

  const handleChecked = (titleId) => setTitles({
    ...selectedTitles,
    [titleId]: !selectedTitles[titleId]
  });

  const onDelete = () => deleteAuthor(authorId)
    .then((result) => {
      if (result.success) {
        setValues({});
        setMessage('Successfully deleted title');
        if (typeof onDataChange === 'function') {
          onDataChange(result);
        }
      } else {
        setMessage('An error occurred while attempting deletion.');
      }
    });

  useEffect(() => {
    if (!isDeleted && authorId) {
      getLibraryAuthor({ id: authorId }).then((data) => setValues(data));
    }
  }, [authorId]);

  return (
    <ModalAppletLayout>
      <ThemedDiv className="flex flex-row p-2 justify-between items-center">
        <DeleteForm onDelete={onDelete}>
          Delete Author
        </DeleteForm>
        <ThemedButton
          onClick={onClose}
        >
          Close
        </ThemedButton>
      </ThemedDiv>
      {!message ? null : <MessageBox>{message}</MessageBox>}
      <AuthorForm
        setValue={(val) => setValues({ ...values, ...val })}
        author={values}
        onSubmit={(data) => {
          submitForm(data);
          if (onDataChange && typeof onDataChange === 'function') {
            onDataChange();
          }
        }}
        selectedTitles={selectedTitles}
        onSelect={handleChecked}
        onDelete={onDelete}
      />
    </ModalAppletLayout>
  );
}

const mapStateToProps = (state) => ({
  selectedTitles: state.authors.author.selectedTitles,
  message: state.messages.authors
});

const mapDispatchToProps = (dispatch) => ({
  setTitles: (selectedTitles) => dispatch(setSelectedTitles(selectedTitles)),
  setMessage: (message = false) => dispatch(setAuthorMessage(message)),
  submitForm: (data) => dispatch(updateAuthor(data)),
  // deleteAuthor: (author) => dispatch()
});

export default connect(mapStateToProps, mapDispatchToProps)(Author);
