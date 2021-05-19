import { useState } from 'react';
import TitleWindow from '../../components/Titles/TitleWindow';
import ModalAppletLayout from '../../shared/components/Layout/ModalAppletLayout';
import { ThemedButton, ThemedDiv } from '../../shared/components/Styled';

function Title({ title = {}, onClose }) {
  const [isEditing, setIsEditing] = useState(false);

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
      {isEditing
        ? (
          <div>
            editing!
          </div>
        )
        : (
          <TitleWindow title={title} />
        )}
    </ModalAppletLayout>
  );
}

export default Title;
