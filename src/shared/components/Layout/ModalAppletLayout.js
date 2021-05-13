import { ThemedDiv } from '../Styled';

function ModalAppletLayout({ children }) {
  return (
    <ThemedDiv className="m-4 p-4 flex-1 border-2 rounded-lg overflow-y-scroll w-11/12">
      {children}
    </ThemedDiv>
  );
}

export default ModalAppletLayout;
