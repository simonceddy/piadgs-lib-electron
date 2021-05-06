function FlexRow({ children, className }) {
  return (
    <div className={`flex flex-row ${className}`}>
      {children}
    </div>
  );
}

export default FlexRow;
