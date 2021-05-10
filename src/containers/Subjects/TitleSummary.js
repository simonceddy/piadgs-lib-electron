function TitleSummary({ title }) {
  return (
    <div className="w-full flex flex-col justify-between items-center p-2">
      <div className="w-full">
        {title.accessionNumber}
      </div>
      <div className="w-full">
        {title.isbn}
      </div>
      <div className="w-full">
        {title.imprint}
      </div>
    </div>
  );
}

export default TitleSummary;
