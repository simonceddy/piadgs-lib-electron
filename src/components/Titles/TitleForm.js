import { titleModel } from '../../backend/models';
import { FlexCol, FlexRow } from '../../shared/components/Flex';
import { DefaultForm } from '../../shared/components/Forms';
import { ThemedButton, ThemedDiv, ThemedTextInput } from '../../shared/components/Styled';
import DeleteForm from '../../shared/components/Forms/DeleteForm';

function TitleForm({
  values = {},
  setValues,
  onSubmit = () => null
}) {
  const { authors, subjects } = values || [];

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
        <FlexCol className="flex-1 justify-start items-center">
          <FlexCol className="w-full p-2 justify-start items-start">
            {authors.length < 1 ? 'No authors' : (
              <ThemedDiv className="p-2 border-2 rounded-lg flex flex-col justify-start items-start w-full">
                <span className="text-lg font-bold mb-2">Authors:</span>
                {authors.map((author) => (
                  <div key={author.id}>
                    {author.surname}{author.given_names ? `, ${author.given_names}` : null}
                  </div>
                ))}
              </ThemedDiv>
            )}
          </FlexCol>
          <FlexCol className="w-full p-2 justify-start items-start">
            {subjects.length < 1 ? 'No subjects' : (
              <ThemedDiv className="p-2 border-2 rounded-lg flex flex-col justify-start items-start w-full">              <span className="text-lg font-bold mb-2">Subjects:</span>
                {subjects.map((subject) => (
                  <div key={subject.id}>
                    {subject.name}
                  </div>
                ))}
              </ThemedDiv>
            )}
          </FlexCol>
        </FlexCol>
      </FlexRow>
      <FlexRow className="p-2 justify-center items-center w-full">
        <ThemedButton submits>
          Save Changes
        </ThemedButton>
      </FlexRow>
      <div>
        <DeleteForm onDelete={() => console.log('delete')}>
          Delete Title
        </DeleteForm>
      </div>
    </DefaultForm>
  );
}

export default TitleForm;
