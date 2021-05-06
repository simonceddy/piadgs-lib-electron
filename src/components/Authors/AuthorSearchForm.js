function AuthorSearchForm({ onSubmit = () => null, children }) {
  return (
    <form
      className="flex flex-row justify-around items-center mx-auto p-2"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {children}
    </form>
  );
}

export default AuthorSearchForm;
