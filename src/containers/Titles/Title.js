import { useState } from 'react';
// import { connect } from 'react-redux';
import TitleForm from '../../components/Titles/TitleForm';
import TitleWindow from '../../components/Titles/TitleWindow';
import { deleteTitle, updateTitle } from '../../message-control/controllers/titleControllers';
import ModalAppletLayout from '../../shared/components/Layout/ModalAppletLayout';
import { ThemedButton, ThemedDiv } from '../../shared/components/Styled';
// import { removeTitle } from '../../store/actions/titles/titleActions';

function Title({
  title = {},
  onClose,
  onTitleChange,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [values, setValues] = useState(title);
  const [statusMessage, setStatusMessage] = useState(null);

  const onDelete = (id) => deleteTitle(id)
    .then((result) => {
      if (result.success) {
        setValues({});
        setStatusMessage('Successfully deleted title');
        if (typeof onTitleChange === 'function') {
          onTitleChange(result);
        }
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
        if (typeof onTitleChange === 'function') {
          onTitleChange(result);
        }
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
              <TitleForm
                values={values}
                setValues={(vals) => setValues(vals)}
                onSubmit={submitChanges}
                onDelete={() => onDelete(title.id)}
              />
            )
            : (
              <TitleWindow title={title} />
            )}
        </>
      ) : null}
    </ModalAppletLayout>
  );
}

export default Title;
