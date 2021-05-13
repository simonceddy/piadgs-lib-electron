import { ThemedDiv } from '../Styled';

function AppLayout({ children }) {
  return (
    <ThemedDiv className="w-full h-full flex flex-col justify-start items-center">
      {children}
    </ThemedDiv>
  );
}

export default AppLayout;
