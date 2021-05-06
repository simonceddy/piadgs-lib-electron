/* eslint-disable react/jsx-props-no-spreading */
import ReactModal from 'react-modal';
import styled from 'styled-components';
import theme from 'styled-theming';
import { colourMaps } from '../../themes';
import './Modal.css';

ReactModal.setAppElement('#root');

const background = theme('mode', colourMaps.background);
const overlay = theme('mode', colourMaps.overlay);
const text = theme('mode', colourMaps.text);
const primary = theme('mode', colourMaps.primary);

const StyledModal = styled(ReactModal)`
  background-color: ${background};
  color: ${text};
  border-color: ${primary};
`;

const StyledOverlay = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${overlay};
`;

function Modal({
  children,
  isOpen,
  onClose,
  label = 'Modal'
}) {
  return (
    <StyledModal
      closeTimeoutMS={110}
      contentLabel={label}
      isOpen={isOpen}
      onRequestClose={onClose}
      className="m-auto w-1/2 h-1/2 border-2 rounded-lg"
      overlayClassName="fixed flex flex-col "
      overlayElement={(props, contentElement) => (
        <StyledOverlay
          {...props}
        >
          {contentElement}
        </StyledOverlay>
      )}
    >
      {children}
    </StyledModal>
  );
}

export default Modal;
