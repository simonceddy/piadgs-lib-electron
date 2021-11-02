import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import AuthorForm from '../../components/Authors/AuthorForm';
import Messages from '../../components/Messages';
import { deleteAuthor, getLibraryAuthor } from '../../message-control/controllers';
import { FlexRow } from '../../shared/components/Flex';
import DeleteForm from '../../shared/components/Forms/DeleteForm';
import { ThemedButton, ThemedDiv } from '../../shared/components/Styled';
import {
  setAuthorMessage,
  setSelectedTitles,
  updateAuthor
} from '../../store/actions';

function Author({
  match,
  // authorId,
  // onClose,
  submitForm = () => {},
  onDataChange
}) {
  const { id: authorId } = match.params;
  const history = useHistory();
  const [isDeleted/* , setIsDeleted */] = useState(false);
  // const [values, setValues] = useState({});
  const [values, setValues] = useState({});
  const [statusMessage, setStatusMessage] = useState(null);

  const onDelete = () => deleteAuthor(authorId)
    .then((result) => {
      if (result.success) {
        setValues({});
        setStatusMessage('Successfully deleted author');
        if (typeof onDataChange === 'function') {
          onDataChange(result);
        }
      } else {
        setStatusMessage('An error occurred while attempting deletion.');
      }
    });

  useEffect(() => {
    if (!isDeleted && authorId) {
      getLibraryAuthor({ id: authorId }).then((data) => {
        console.log(data);
        setValues(data);
      });
    }
  }, [authorId]);

  return (
    <ThemedDiv
      className="w-full max-h-full flex flex-col justify-between items-center z-40 flex-1 border-2 p-4 rounded-xl"
    >
      <ThemedDiv className="flex flex-row p-2 justify-between items-center">
        <ThemedButton
          onClick={history.goBack()}
        >
          Back
        </ThemedButton>
      </ThemedDiv>
      {statusMessage ? (
        <Messages
          clearMessage={() => setStatusMessage(null)}
          message={statusMessage}
        />
      ) : null}
      <AuthorForm
        setValue={(val) => setValues({ ...values, ...val })}
        author={values}
        onSubmit={(data) => {
          submitForm(data);
          if (onDataChange && typeof onDataChange === 'function') {
            onDataChange();
          }
        }}
        onDelete={onDelete}
      />
      <FlexRow className="p-2 w-full justify-start items-center">
        <DeleteForm onDelete={onDelete}>
          Delete Author
        </DeleteForm>
      </FlexRow>
    </ThemedDiv>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Author));
