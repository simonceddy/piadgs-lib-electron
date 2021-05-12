import { FlexRow } from '../../shared/components/Flex';

function Toolbar({ items = [] }) {
  return (
    <FlexRow className="w-full justify-start items-center p-2">
      {items.length < 1 ? null : items.map((group = []) => (
        <span className="flex flex-row justify-evenly items-center mr-3">
          {group.map(({ key, Icon, }) => (Icon
            ? <Icon key={key} />
            : null))}
        </span>
      ))}
    </FlexRow>
  );
}

export default Toolbar;
