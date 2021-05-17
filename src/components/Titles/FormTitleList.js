function FormTitleList({ titles = [] }) {
  return (
    <ul className="w-full p-2">
      {titles.map((title) => (
        <li key={title.id}>{title.title}</li>
      ))}
    </ul>
  );
}

export default FormTitleList;
