import { FlexRow } from '../../shared/components/Flex';

function Toolbar({ children }) {
  return (
    <FlexRow className="w-full justify-between items-center p-2">
      {children}
    </FlexRow>
  );
}

export default Toolbar;
