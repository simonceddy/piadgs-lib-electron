function SubjectsToolbar({ children }) {
  return (
    <div className="flex flex-row items-center justify-around w-full p-2">
      {children}
      <span>List subjects</span>
      <span>Add subject</span>
      <span>Add subject</span>
    </div>
  );
}

export default SubjectsToolbar;
