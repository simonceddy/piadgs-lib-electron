import { useState } from 'react';
import Help from '../../components/Help';
import { FlexRow } from '../../shared/components/Flex';
import { DefaultForm, InputField } from '../../shared/components/Forms';

function CreateSubject({ children }) {
  const [currentInput, setCurrentInput] = useState('');

  return (
    <div className="flex-1 w-full flex flex-col justify-start items-center">
      <FlexRow className="justify-between items-center p-2 w-full">
        Add subjects form - TODO: check existing subjects, store subjects api side
        <Help topic="createSubject" />
      </FlexRow>
      {children}
      <DefaultForm
        onSubmit={(e) => {
          e.preventDefault();
          console.log(currentInput);
        }}
      >
        <InputField
          label="Enter subjects:"
          value={currentInput}
          id="subjects"
          name="subjects"
          onChange={(e) => setCurrentInput(e.target.value)}
        />
      </DefaultForm>
    </div>
  );
}

export default CreateSubject;
