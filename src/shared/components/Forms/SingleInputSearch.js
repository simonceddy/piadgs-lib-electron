function AuthorSearchForm({ onSubmit = () => null, children }) {
  return (
    <form
      className="flex flex-row justify-around items-center w-full p-4"
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
