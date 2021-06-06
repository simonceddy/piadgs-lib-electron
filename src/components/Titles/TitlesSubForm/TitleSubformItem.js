function TitleSubformItem({ title = {} }) {
  return (
    <span
      className="flex flex-row justify-between items-center flex-1"
      id={title.id}
    >
      {title.title}
    </span>
  );
}

export default TitleSubformItem;
