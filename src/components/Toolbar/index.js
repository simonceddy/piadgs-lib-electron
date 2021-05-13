import { FlexRow } from '../../shared/components/Flex';
import ToolbarButton from './ToolbarButton';

function Toolbar({ items = [] }) {
  return (
    <FlexRow className="w-full justify-start items-center p-2">
      {items.length < 1 ? null : items.map((group = [], index) => (
        <span key={index} className="flex flex-row justify-evenly items-center mr-3">
          {group.map(({
            key,
            Icon,
            to,
            exact
          }) => (
            <ToolbarButton key={key} to={to} exact={exact}>
              { Icon
                ? <Icon size={32} />
                : key}
            </ToolbarButton>
          ))}
        </span>
      ))}
    </FlexRow>
  );
}

export default Toolbar;
