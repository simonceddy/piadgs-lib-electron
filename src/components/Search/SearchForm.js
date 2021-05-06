import InputField from '../../shared/components/Forms/InputField';
import LgFormButton from '../../shared/components/Forms/LgFormButton';
import { SecondaryForm } from '../../shared/components/Styled';

const fields = {
  title: {
    label: 'Title'
  },
  author: { label: 'Author' },
  subject: { label: 'Subject' },
  callNumber: { label: 'Location' }
};

function SearchForm({
  resetForm,
  values,
  submitForm,
  onValueChange,
  children
}) {
  return (
    <SecondaryForm
      onSubmit={submitForm}
      className="px-3 py-6 flex flex-col justify-between items-center border-2 w-1/2 rounded"
    >
      {children}
      {Object.keys(values).map((value, key) => (
        <InputField
          className="p-4"
          labelClassName="p-2"
          inputClassName="p-2"
          key={key}
          label={fields[value].label}
          name={value}
          value={values[value]}
          onChange={onValueChange}
        />
      ))}
      <div className="flex flex-row justify-around items-center w-4/5 p-4">
        <LgFormButton
          className="border-blue-800 bg-green-200 hover:bg-yellow-200 active:bg-blue-200 text-blue-800 active:text-green-800 active:border-green-800"
          type="submit"
        >
          Search
        </LgFormButton>
        <LgFormButton
          onClick={resetForm}
          className="border-red-800 bg-yellow-200 hover:bg-red-200 active:bg-red-800 text-red-800 active:text-yellow-200 active:border-yellow-200"
        >
          Clear Form
        </LgFormButton>
      </div>
    </SecondaryForm>
  );
}

export default SearchForm;
