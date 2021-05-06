import axios from 'axios';
import { useEffect } from 'react';
import TitleFormInputs from '../../components/Admin/Titles/TitleFormInputs';
import useTitleForm from '../../hooks/useTitleForm';
import { LgFormButton } from '../../shared/components/Forms';
import adminColumns from '../../util/adminColumns';

const fields = [
  ...adminColumns
];

function EditTitle({ match }) {
  const { id } = match.params;
  const {
    values,
    setMessage,
    message,
    setValues,
    setValue
  } = useTitleForm();

  // console.log(values);
  useEffect(() => {
    axios.get(`/titles/${id}`)
      .then((res) => setValues(res.data.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div>
      <div>
        {message}
      </div>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={(e) => {
          e.preventDefault();
          axios.post('/titles/update', {
            ...values
          })
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                setMessage('Successfully saved');
              } else {
                setMessage('An error has occurred.');
              }
            })
            .catch((err) => setMessage(err.message));
        }}
      >
        <TitleFormInputs
          fields={fields}
          values={values}
          setValues={setValue}
        />
        <LgFormButton type="submit">
          Save
        </LgFormButton>
      </form>
    </div>
  );
}

export default EditTitle;
