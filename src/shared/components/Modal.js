function Modal({ children, onClose }) {
  return (
    <div
      className="absolute w-full h-full top-0 left-0 flex flex-col all-center"
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
      <div className="flex flex-col z-20 m-auto all-center max-h-full overflow-scroll w-full sm:w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3">
        {children}
      </div>
    </div>
  );
}

export default Modal;
