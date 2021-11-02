import { ThemedDiv } from '../../shared/components/Styled';
import StyledButton from '../../shared/components/Styled/StyledButton';

function Messages({ message, clearMessage }) {
  return (
    <ThemedDiv
      className="flex-1 flex flex-row justify-end items-center p-2 m-2 z-50 absolute"
      role="presentation"
      onClick={clearMessage}
    >
      {!message ? null : (
        <>
          <span>
            {message}
          </span>
          <StyledButton
            onClick={clearMessage}
            className="enabled px-2 rounded-full text-lg ml-4"
          >
            ⌫
          </StyledButton>
        </>
      ) }
    </ThemedDiv>
  );
}

export default Messages;
