import { PrimaryBorderDiv } from '../../shared/components/Styled';

function MainContentContainer({ children }) {
  return (
    <PrimaryBorderDiv
      className="flex flex-col w-full h-full overflow-scroll flex-1 p-2 border-2 justify-start items-center"
    >
      {children}
    </PrimaryBorderDiv>
  );
}

export default MainContentContainer;
