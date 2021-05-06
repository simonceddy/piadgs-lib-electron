import SubjectTitleRow from './SubjectTitleRow';

function SubjectTitleList({
  titles = [],
  selectedTitles = {},
  handleChecked = () => null,
  isEditing = false
}) {
  return (
    <div className="flex flex-col w-full mb-2">
      <span>Titles:</span>
      <div className="flex flex-col overflow-scroll justify-start items-start w-full">
        {titles.map((title = {}) => (
          <SubjectTitleRow
            key={title.id}
            title={title}
            isEditing={isEditing}
            checked={selectedTitles[title.id] === true}
            onChange={() => handleChecked(title.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default SubjectTitleList;
