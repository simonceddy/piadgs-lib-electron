/* eslint-disable no-unused-vars */
// import { useState } from 'react';
import { titleModel } from '../../backend/models';
import { FlexCol, FlexRow } from '../../shared/components/Flex';
import { DefaultForm } from '../../shared/components/Forms';
import { ThemedButton, ThemedTextInput } from '../../shared/components/Styled';
// import DeleteForm from '../../shared/components/Forms/DeleteForm';

function TitleForm({
  values = {},
  setValues,
  onSubmit = () => null,
  // onDelete = () => null
}) {
  // const [authors, setAuthors] = useState(values.authors || []);
  // const [subjects, setSubjects] = useState(values.subjects || []);

  // console.log(authors, subjects);
  return (
    <DefaultForm
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex-1 flex flex-col justify-start items-center w-full"
    >
      <FlexRow className="w-full">
        <FlexCol className="flex-1 justify-start items-start">
          {!values.id ? null : (
            <input type="hidden" defaultValue={values.id} />
          )}
          {Object.keys(titleModel).map((key) => (
            <ThemedTextInput
              key={`title-${key}-form-input`}
              label={key}
              value={values[key] || ''}
              onChange={(e) => setValues({ ...values, [key]: e.target.value })}
            />
          ))}
        </FlexCol>
      </FlexRow>
      <FlexRow className="p-2 justify-center items-center w-full">
        <ThemedButton submits>
          Save Changes
        </ThemedButton>
      </FlexRow>
    </DefaultForm>
  );
}

export default TitleForm;
