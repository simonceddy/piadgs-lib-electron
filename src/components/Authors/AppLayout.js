import { ThemedDiv } from '../../shared/components/Styled';

function AppLayout({ children }) {
  return (
    <ThemedDiv className="p-2 w-full h-full flexColFromTop">
      {children}
    </ThemedDiv>
  );
}

export default AppLayout;
