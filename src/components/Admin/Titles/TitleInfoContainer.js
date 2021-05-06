function TitleInfoContainer({ children, className = '' }) {
  return (
    <div className={`${className} p-1`}>
      {children}
    </div>
  );
}

export default TitleInfoContainer;
