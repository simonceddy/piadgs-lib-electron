/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import AuthorForm from '../../components/Authors/AuthorForm';
import AuthorSummary from '../../components/Authors/AuthorSummary';
import MessageBox from '../../components/Authors/MessageBox';
import { getLibraryAuthor } from '../../message-control/controllers';
import ModalAppletLayout from '../../shared/components/Layout/ModalAppletLayout';
import { ThemedButton, ThemedDiv } from '../../shared/components/Styled';
import {
  setAuthorMessage,
  setAuthorData,
  setSelectedTitles,
  updateAuthor
} from '../../store/actions/authors';

function Author({
  id,
  data,
  selectedTitles,
  setTitles,
  setData,
  message,
  setMessage,
  onClose,
  submitForm
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleChecked = (titleId) => setTitles({
    ...selectedTitles,
    [titleId]: !selectedTitles[titleId]
  });

  useEffect(() => {
    if (!isLoaded) {
      getLibraryAuthor({ id })
        .then((res) => {
          // console.log(res);
          if (res.id) {
            return Promise.resolve(setData(res))
              .then(() => Promise.resolve(setTitles(Object.fromEntries(
                data.titles.map(({ id: titleId }) => [titleId, true])
              ))));
          }
          return Promise.resolve(setMessage('There was an error accessing the author data.'));
        })
        .then(() => setIsLoaded(true))
        .catch((err) => console.log(err));
    }
  });

  if (!isLoaded) {
    return (
      <div>Retrieving data...</div>
    );
  }

  return (
    <ModalAppletLayout>
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
      {!message ? null : <MessageBox>{message}</MessageBox>}
      {isEditing ? (
        <AuthorForm
          setValue={(val) => setData(val)}
          author={data}
          onSubmit={submitForm}
          selectedTitles={selectedTitles}
          onSelect={handleChecked}
        />
      ) : (<AuthorSummary author={data} />)}
    </ModalAppletLayout>
  );
}

const mapStateToProps = (state) => ({
  data: state.authors.author.data,
  selectedTitles: state.authors.author.selectedTitles,
  message: state.authors.messages.message
});

const mapDispatchToProps = (dispatch) => ({
  setData: (data) => dispatch(setAuthorData(data)),
  setTitles: (selectedTitles) => dispatch(setSelectedTitles(selectedTitles)),
  setMessage: (message = false) => dispatch(setAuthorMessage(message)),
  submitForm: (data) => dispatch(updateAuthor(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Author);
