import { InputField } from '../../../shared/components/Forms';

const requiredFields = {
  title: true
};

function TitleFormInputs({
  fields = [],
  values = {},
  setValues,
  required = requiredFields
}) {
  return (
    <div>
      {fields.map((field = {}, key) => {
        const { FormComponent } = field;
        return (
          FormComponent ? (
            <FormComponent
              key={key}
              value={values[field.key]}
              onChange={(e) => setValues({ [field.key]: e.target.value })}
            />
          ) : (
            <InputField
              className="p-2"
              labelClassName="p-1"
              inputClassName="p-1"
              required={required[field.key] || false}
              key={key}
              value={values[field.key] || ''}
              label={field.name}
              name={field.key}
              onChange={(e) => setValues({ [field.key]: e.target.value })}
            />
          ));
      })}
    </div>
  );
}

export default TitleFormInputs;
