function SubjectForm({ children }) {
  return (
    <form
      className=""
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {children}
    </form>
  );
}

export default SubjectForm;
