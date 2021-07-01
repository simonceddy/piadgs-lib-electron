import { FlexRow } from '../../shared/components/Flex';

function WorksToDbToolbar({ children }) {
  return (
    <FlexRow className="w-full p-2 justify-start items-center">
      {children}
    </FlexRow>
  );
}

export default WorksToDbToolbar;
