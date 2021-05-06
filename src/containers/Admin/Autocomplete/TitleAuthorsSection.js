import { useMemo } from 'react';
import { FlexCol, FlexRow } from '../../../shared/components/Flex';
import { InputField } from '../../../shared/components/Forms';
import useFormSuggest from '../../../hooks/useFormSuggest';

function TitleAuthorsSection({
  value,
  setAuthors
}) {
  const {
    data,
    inputVal,
    setInputVal
  } = useFormSuggest((val) => `/authors/search?name=${val}`);

  const addAuthor = (author) => setAuthors([...value, author]);

  const removeAuthor = () => {
    console.log('TODO');
  };

  const items = useMemo(() => data.map((author, index) => ({
    label: `${author.surname}${author.givenNames ? `, ${author.givenNames}` : null}`,
    key: author.id,
    index
  })), [data]);

  return (
    <>
      <FlexCol className="w-2/3 px-4">
        {value.map((author, index) => (
          <FlexRow key={author.id} className="justify-between items-center w-full">
            <span>
              {`${author.surname}${author.givenNames ? `, ${author.givenNames}` : null}`}
            </span>
            <span>
              <button
                type="button"
                onClick={() => removeAuthor(index)}
              >
                remove
              </button>
            </span>
          </FlexRow>
        ))}
      </FlexCol>
      <InputField
        value={inputVal}
        label="Authors"
        name="authors"
        id="authors"
        list="authors-list"
        onChange={(e) => setInputVal(e.target.value)}
      />
      <ul className="overflow-scroll max-h-20">
        {inputVal.length >= 3 ? items.map((option) => (
          <li
            key={option.key}
            role="presentation"
            onClick={() => addAuthor(data[option.index])}
            className="p-0.5"
          >
            {option.label}
          </li>
        )) : null}
      </ul>
    </>
  );
}

export default TitleAuthorsSection;
