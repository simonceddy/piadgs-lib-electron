import styled from 'styled-components';

const StyledForm = styled.form``;

function DefaultForm({ children, className = '', onSubmit }) {
  return (
    <StyledForm
      className={`${className} w-5/6 border border-black rounded-md p-4`}
      onSubmit={onSubmit}
    >
      {children}
    </StyledForm>
  );
}

export default DefaultForm;
