import { useMemo } from 'react';
import { InputField } from '../../../shared/components/Forms';
import { FlexCol, FlexRow } from '../../../shared/components/Flex';
import useFormSuggest from '../../../hooks/useFormSuggest';

function TitleSubjectsSection({
  value,
  setSubjects
}) {
  const {
    data,
    inputVal,
    setInputVal
  } = useFormSuggest((val) => `/subjects/search?name=${val}`);

  const addSubject = (subject) => setSubjects([...value, subject]);

  const removeSubject = () => {
    console.log('TODO');
  };

  const items = useMemo(() => data.map((subject, index) => ({
    label: subject.name,
    key: subject.id,
    index
  })), [data]);

  return (
    <>
      {value.length > 0 ? (
        <FlexCol className="w-full">
          {value.map((subject, index) => (
            <FlexRow key={subject.id} className="justify-between items-center w-full">
              <span>
                {subject.name}
              </span>
              <span>
                <button
                  type="button"
                  onClick={() => removeSubject(index)}
                >
                  remove
                </button>
              </span>
            </FlexRow>
          ))}
        </FlexCol>
      ) : null}
      <InputField
        value={inputVal}
        label="Subjects"
        name="subjects"
        id="subjects"
        list="subjects-list"
        onChange={(e) => setInputVal(e.target.value)}
      />
      <ul className="overflow-scroll max-h-20">
        {inputVal.length >= 3 ? items.map((option) => (
          <li
            key={option.key}
            role="presentation"
            onClick={() => addSubject(data[option.index])}
            className="p-0.5"
          >
            {option.label}
          </li>
        )) : null}
      </ul>
    </>
  );
}

export default TitleSubjectsSection;
