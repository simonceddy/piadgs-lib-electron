import { connect } from 'react-redux';
import { TitleForm } from '../../components/Admin';
import { FlexRow } from '../../shared/components/Flex';
import { LgFormButton } from '../../shared/components/Forms';
import adminColumns from '../../util/adminColumns';
import TitleFormInputs from '../../components/Admin/Titles/TitleFormInputs';
import useTitleForm from '../../hooks/useTitleForm';
import { saveTitle } from '../../store/actions';

// In case we add fields that aren't columns
const fields = [
  ...adminColumns
];

function CreateTitle({
  submitValues = () => {}
}) {
  const { values, setValue, resetForm } = useTitleForm();

  const stored = false;
  // const [errors, setErrors] = useState([]);

  // const submitValues = (data) => axios.post('/titles/create', data)
  //   .then((res) => {
  //     if (res.status === 200) {
  //       setStored(true);
  //     }
  //   })
  //   .catch((err) => setErrors([...errors, err]));

  return (
    <TitleForm
      onSubmit={(e) => {
        e.preventDefault();
        submitValues(values);
      }}
    >
      {stored ? <div>Title was saved!</div> : null}
      <TitleFormInputs
        values={values}
        fields={fields}
        setValues={setValue}
      />
      <FlexRow className="justify-between items-center py-2 px-4">
        <LgFormButton type="submit">Save</LgFormButton>
        <LgFormButton onClick={() => resetForm()}>Clear Form</LgFormButton>
      </FlexRow>
    </TitleForm>
  );
}

const mapDispatchToProps = (dispatch) => ({
  submitValues: (values) => dispatch(saveTitle(values))
});

export default connect(null, mapDispatchToProps)(CreateTitle);
