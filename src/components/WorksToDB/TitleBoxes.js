import { FlexRow } from '../../shared/components/Flex';
import ConvertedTitle from './ConvertedTitle';
import TitleButtons from './TitleButtons';

function TitleBoxes({
  titles = [],
  persistTitle = () => null,
  removeTitle = () => null,
}) {
  return (
    <FlexRow className="w-full justify-evenly items-start flex-1 overflow-scroll flex-wrap">
      {titles.map((title) => (
        <ConvertedTitle key={title.id} title={title}>
          <TitleButtons
            title={title}
            persistTitle={() => persistTitle(title)}
            removeTitle={removeTitle}
          />
        </ConvertedTitle>
      ))}
    </FlexRow>
  );
}

export default TitleBoxes;
