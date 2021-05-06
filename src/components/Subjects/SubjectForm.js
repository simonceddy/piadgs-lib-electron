function SubjectForm({ children }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {children}
    </form>
  );
}

export default SubjectForm;
