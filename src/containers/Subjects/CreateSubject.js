// import { useState } from 'react';
import { connect } from 'react-redux';
import { FlexRow } from '../../shared/components/Flex';
import { DefaultForm } from '../../shared/components/Forms';
import { ThemedButton, ThemedDiv, ThemedTextInput } from '../../shared/components/Styled';
import {
  clearSubjectForm,
  saveSubject,
  setSubjectFormInput
} from '../../store/actions';
// import TitlesSubForm from '../Titles/TitlesSubForm';

function CreateSubject({
  vals = {},
  // titles = [],
  setVals = () => null,
  submitForm = () => null,
  resetForm,
}) {
  // eslint-disable-next-line no-unused-vars
  // const [selectedTitles, setSelectedTitles] = useState(titles);

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

export default connect(mapStateToProps, mapDispatchToProps)(CreateSubject);
