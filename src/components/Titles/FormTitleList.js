function FormTitleList({ titles = [] }) {
  return (
    <ul>
      {titles.map((title) => (
        <li key={title.id}>{title.title}</li>
      ))}
    </ul>
  );
}

export default FormTitleList;
