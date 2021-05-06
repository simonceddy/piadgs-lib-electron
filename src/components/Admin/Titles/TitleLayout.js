import { FlexCol } from '../../../shared/components/Flex';

function TitleLayout({ children }) {
  return (
    <FlexCol className="w-full m:w-2/3 flex-1 justify-start items-center">
      {children}
    </FlexCol>
  );
}

export default TitleLayout;
