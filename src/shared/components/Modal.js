function Modal({ children, onClose }) {
  return (
    <div
      className="absolute w-full h-full top-0 left-0 flex flex-col items-center justify-start"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}
      role="presentation"
    >
      <div
        role="presentation"
        className="w-full h-full opacity-0 z-10 absolute"
        onClick={onClose}
      />
      <div className="flex flex-col z-20 mx-auto all-center max-h-full overflow-scroll w-full">
        {children}
      </div>
    </div>
  );
}

export default Modal;
