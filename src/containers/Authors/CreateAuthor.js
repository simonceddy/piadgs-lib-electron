import { connect } from 'react-redux';
import { FlexCol, FlexRow } from '../../shared/components/Flex';
import { DefaultForm } from '../../shared/components/Forms';
import { ThemedButton, ThemedDiv, ThemedTextInput } from '../../shared/components/Styled';
import { setAuthorFormInput } from '../../store/actions/authors';
import TitlesSubForm from '../Titles/TitlesSubForm';

function CreateAuthor({ vals = {}, titles = [], setVals = () => null }) {
  return (
    <DefaultForm
      className="w-full h-full flex flex-col"
      onSubmit={() => console.log(vals)}
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
        <ThemedDiv className="flex-1 p-2 border-2 rounded-xl ml-6 h-full">
          <FlexCol className="justify-start items-center p-2">
            <FlexRow className="w-full justify-start items-center">
              <ThemedButton
                onClick={() => console.log('add title')}
              >
                Add author&apos;s titles
              </ThemedButton>
            </FlexRow>
            <TitlesSubForm titles={titles} />
          </FlexCol>
        </ThemedDiv>
      </FlexRow>
      {}
    </DefaultForm>
  );
}

const mapStateToProps = (state) => ({
  vals: state.authors.authorForm.input,
  titles: state.authors.authorForm.titles,
});

const mapDispatchToProps = (dispatch) => ({
  setVals: (vals) => dispatch(setAuthorFormInput(vals))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAuthor);
