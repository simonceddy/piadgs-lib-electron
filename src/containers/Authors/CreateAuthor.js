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
            value={vals.name}
            onChange={(e) => setVals({ ...vals, name: e.target.value })}
            label="Name"
            id="author-name"
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
    name: ''
  }))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAuthor);
