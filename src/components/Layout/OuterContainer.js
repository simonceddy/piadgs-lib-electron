import { AppContainer } from '../../shared/components/Styled';

function OuterContainer({ children }) {
  return (
    <AppContainer className="w-full h-full flex flex-col justify-between items-center p-2">
      {children}
    </AppContainer>
  );
}

export default OuterContainer;
