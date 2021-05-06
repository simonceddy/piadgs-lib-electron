import { useMemo, useState } from 'react';
import TitleSummary from './TitleSummary';
import { THEME_COLOUR_CLASSES } from '../../consts';

const titleStyles = 'py-1 px-2 my-0.5 flex flex-1 flex-row justify-between items-center';

function TitleListItem({
  title,
  checked,
  onChange,
  isEditing = false
}) {
  const [viewSummary, setViewSummary] = useState(false);

  const Summary = useMemo(() => <TitleSummary id={title.id} />, [title]);

  return (
    <div
      key={title.id}
      className={`justify-between items-center ${THEME_COLOUR_CLASSES} w-full flex flex-col border rounded-lg my-0.5`}
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
    </div>
  );
}

export default TitleListItem;
