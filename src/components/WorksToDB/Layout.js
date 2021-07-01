import { ThemedDiv } from '../../shared/components/Styled';

function Layout({ children }) {
  return (
    <ThemedDiv className="w-full h-full flex flex-col justify-start items-center">
      {children}
    </ThemedDiv>
  );
}

export default Layout;
