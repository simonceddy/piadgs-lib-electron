// import { useState } from 'react';
import { connect } from 'react-redux';
import { createSubject } from '../../message-control/controllers';
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
  // submitForm = () => null,
  resetForm,
  onCreated,
  setMessage = () => {},
}) {
  const onSubmit = (e) => {
    e.preventDefault();
    createSubject(vals)
      .then((result) => {
        // console.log(result);
        if (!result.success) {
          setMessage('There was an error saving');
        } else {
          // success
          setMessage('New subject saved successfully');
          if (typeof onCreated === 'function') onCreated();
        }
      });
  };

  return (
    <DefaultForm
      className="w-full h-full flex flex-row"
      onSubmit={onSubmit}
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
      <FlexRow className="mx-auto justify-around items-center p-4">
        <ThemedButton
          className="mx-1"
          submits
        >
          Save Subject
        </ThemedButton>
        <ThemedButton
          className="mx-1"
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
