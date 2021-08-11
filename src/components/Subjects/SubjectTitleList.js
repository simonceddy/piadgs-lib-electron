import SubjectTitleRow from './SubjectTitleRow';

function SubjectTitleList({
  titles = []
}) {
  return (
    <div className="flex flex-col w-full mb-2">
      <span>Titles:</span>
      <div className="flex flex-col overflow-scroll justify-start items-start w-full">
        {titles.map((title = {}) => (
          <SubjectTitleRow
            key={title.id}
            title={title}
          />
        ))}
      </div>
    </div>
  );
}

export default SubjectTitleList;
