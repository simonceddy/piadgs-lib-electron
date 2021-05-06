function AdaptiveFlexbox({ children, className, sizeClass = 'md' }) {
  return (
    <div className={`flex flex-col ${sizeClass}:flex-row ${className}`}>
      {children}
    </div>
  );
}

export default AdaptiveFlexbox;
