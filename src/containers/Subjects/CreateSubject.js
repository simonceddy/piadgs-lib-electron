import { useState } from 'react';
import { connect } from 'react-redux';
import { FlexCol, FlexRow } from '../../shared/components/Flex';
import { DefaultForm } from '../../shared/components/Forms';
import { ThemedButton, ThemedDiv, ThemedTextInput } from '../../shared/components/Styled';
import {
  clearSubjectForm,
  saveSubject,
  setSubjectFormInput
} from '../../store/actions';
import TitlesSubForm from '../Titles/TitlesSubForm';

function CreareSubject({
  vals = {},
  titles = [],
  setVals = () => null,
  submitForm = () => null,
  resetForm,
}) {
  // eslint-disable-next-line no-unused-vars
  const [selectedTitles, setSelectedTitles] = useState(titles);

  return (
    <DefaultForm
      className="w-full h-full flex flex-col"
      onSubmit={(e) => {
        e.preventDefault();
        submitForm();
      }}
    >
      <FlexRow className="w-full items-start justify-between">
        <ThemedDiv className="flex-1 h-full mr-6 p-2 border-2 rounded-xl">
          <ThemedTextInput
            labelClassName="w-1/4"
            value={vals.name}
            onChange={(e) => setVals({ ...vals, name: e.target.value })}
            label="name"
            id="subject-name"
          />
        </ThemedDiv>
        <ThemedDiv className="flex-1 p-2 border-2 rounded-xl ml-6 h-full">
          <FlexCol className="justify-start items-center p-2">
            <FlexRow className="w-full justify-start items-center">
              <ThemedButton
                onClick={() => console.log('add title')}
              >
                Add subject&apos;s titles
              </ThemedButton>
            </FlexRow>
            <TitlesSubForm titles={titles} />
          </FlexCol>
        </ThemedDiv>
      </FlexRow>
      <FlexRow className="w-full md:w-5/6 lg:w-3/4 mx-auto justify-around items-center p-4">
        <ThemedButton
          submits
        >
          Save Subject
        </ThemedButton>
        <ThemedButton
          onClick={resetForm}
        >
          Clear Form
        </ThemedButton>
      </FlexRow>
    </DefaultForm>
  );
}

const mapStateToProps = (state) => ({
  vals: state.subjects.subjectForm.input,
  titles: state.subjects.subjectForm.titles,
  messages: state.messages.subjects,
});

const mapDispatchToProps = (dispatch) => ({
  setVals: (vals) => dispatch(setSubjectFormInput(vals)),
  submitForm: () => dispatch(saveSubject()),
  resetForm: () => dispatch(clearSubjectForm())
});

export default connect(mapStateToProps, mapDispatchToProps)(CreareSubject);
