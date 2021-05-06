// import { COLOUR_CLASS_NAMES } from '../../shared/consts';

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

      <div className="flex max-h-full flex-col z-10 justify-between">
        {children}
      </div>
    </div>
  );
}

export default Modal;
