import TitleListItem from './TitleListItem';

function TitleList({
  titles = [],
  selectedTitles = {},
  handleChecked = () => null,
}) {
  return (
    <div className="flex flex-col w-full mb-2">
      <span>Titles:</span>
      <div className="flex flex-col overflow-scroll justify-start items-start w-full">
        {titles.map((title = {}) => (
          <TitleListItem
            key={title.id}
            title={title}
            checked={selectedTitles[title.id] === true}
            onChange={() => handleChecked(title.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default TitleList;
