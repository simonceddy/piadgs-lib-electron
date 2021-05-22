import { useState } from 'react';
import TitleForm from '../../components/Titles/TitleForm';
import TitleWindow from '../../components/Titles/TitleWindow';
import { updateTitle } from '../../message-control/controllers/titleControllers';
import ModalAppletLayout from '../../shared/components/Layout/ModalAppletLayout';
import { ThemedButton, ThemedDiv } from '../../shared/components/Styled';

function Title({ title = {}, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [values, setValues] = useState(title);
  const [statusMessage, setStatusMessage] = useState(null);

  const submitChanges = () => {
    updateTitle(values)
      .then((result) => {
        if (result.result !== 1) {
          return setStatusMessage('An error occurred trying to save changes!');
        }
        return setStatusMessage('Successfully saved changes!');
      });
  };

  return (
    <ModalAppletLayout>
      {statusMessage || null}
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
          />
        )
        : (
          <TitleWindow title={title} />
        )}
    </ModalAppletLayout>
  );
}

export default Title;
