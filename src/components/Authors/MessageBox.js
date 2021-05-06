function MessageBox({ children, clear = () => null }) {
  return (
    <div role="presentation" onClick={clear}>
      {children}
    </div>
  );
}

export default MessageBox;
