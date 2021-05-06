import { ThemedDiv } from '../../shared/components/Styled';

function SubjectWindow({ children }) {
  return (
    <ThemedDiv
      className="w-full max-h-full flex flex-col justify-between items-center z-40 flex-1 border-2 p-4 rounded-xl"
    >
      {children}
    </ThemedDiv>
  );
}

export default SubjectWindow;
