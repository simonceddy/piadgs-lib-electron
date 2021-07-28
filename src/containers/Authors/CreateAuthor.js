/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import { createAuthor } from '../../message-control/controllers';
import { FlexRow } from '../../shared/components/Flex';
import { DefaultForm } from '../../shared/components/Forms';
import { ThemedButton, ThemedDiv, ThemedTextInput } from '../../shared/components/Styled';
import { setAuthorFormInput } from '../../store/actions';

function CreateAuthor({
  vals = {},
  setVals = () => null,
  onCreated,
  resetForm,
  setMessage = () => {},
}) {
  const onSubmit = (e) => {
    e.preventDefault();
    createAuthor(vals)
      .then((result) => {
        console.log(result);
        if (!result.success) {
          setMessage('There was an error saving');
        } else {
          // success
          setMessage('New author saved successfully');
          if (typeof onCreated === 'function') onCreated();
        }
      });
  };
  // TODO
  // - persist new author
  // - call onCreated if set
  // - call setMessage with result
  return (
    <DefaultForm
      className="w-full h-full flex flex-col"
      onSubmit={onSubmit}
    >
      <FlexRow className="w-full items-start justify-between">
        <ThemedDiv className="flex-1 h-full mr-6 p-2 border-2 rounded-xl">
          <ThemedTextInput
            labelClassName="w-1/4"
            value={vals.surname}
            onChange={(e) => setVals({ ...vals, surname: e.target.value })}
            label="Surname"
            id="author-surname"
          />
          <ThemedTextInput
            labelClassName="w-1/4"
            value={vals.given_names}
            onChange={(e) => setVals({ ...vals, given_names: e.target.value })}
            label="Given Names"
            id="author-given-names"
          />
        </ThemedDiv>
        <FlexRow>
          <ThemedButton
            submits
          >
            Save
          </ThemedButton>
          <ThemedButton onClick={resetForm}>
            Clear
          </ThemedButton>
        </FlexRow>
      </FlexRow>
    </DefaultForm>
  );
}

const mapStateToProps = (state) => ({
  vals: state.authors.authorForm.input
});

const mapDispatchToProps = (dispatch) => ({
  setVals: (vals) => dispatch(setAuthorFormInput(vals)),
  resetForm: () => dispatch(setAuthorFormInput({
    surname: '',
    given_names: ''
  }))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAuthor);
