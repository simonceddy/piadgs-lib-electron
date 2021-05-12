import { useMemo, useState } from 'react';
import TitleSummary from '../../../containers/Titles/TitleSummary';
import { ThemedDiv } from '../Styled';

const titleStyles = 'py-1 px-2 my-0.5 flex flex-1 flex-row justify-between items-center';

function TitleListItem({
  title,
  checked,
  onChange,
  isEditing = false
}) {
  const [viewSummary, setViewSummary] = useState(false);

  const Summary = useMemo(() => <TitleSummary title={title} />, [title]);

  return (
    <ThemedDiv
      key={title.id}
      className="justify-between items-center w-full flex flex-col border rounded-lg my-0.5"
    >
      <div className="w-full flex flex-row justify-between items-center">
        <button
          type="button"
          className="p-2"
          onClick={() => setViewSummary(!viewSummary)}
        >
          {viewSummary ? '▲' : '▼'}
        </button>
        {isEditing ? (
          <label
            htmlFor={`title-subject-${title.id}`}
            className={`${titleStyles} hover:underline`}
          >
            <span>
              {title.title}
            </span>
            <input
              name={`title-subject-${title.id}`}
              id={`title-subject-${title.id}`}
              type="checkbox"
              className="ml-2"
              value={title.id}
              checked={checked}
              onChange={onChange}
            />
          </label>
        ) : <span className={titleStyles}>{title.title}</span>}
      </div>
      {!viewSummary ? null : Summary }
    </ThemedDiv>
  );
}

export default TitleListItem;
