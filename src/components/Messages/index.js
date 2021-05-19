import StyledButton from '../../shared/components/Styled/StyledButton';

function Messages({ message, clearMessage }) {
  return (
    <div className="flex-1 flex flex-row justify-end items-center">
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
    </div>
  );
}

export default Messages;
