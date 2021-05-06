import { useState } from 'react';
import { connect } from 'react-redux';
import {
  DangerButton,
  ToolbarButton,
  WarnButton
} from '../../shared/components/Buttons';
import { FlexCol, FlexRow } from '../../shared/components/Flex';
import { Modal } from '../../shared/components/Util';
import { clearMessageById } from '../../store/actions';

function ErrorMessages({
  messages = [],
  deleteItem
}) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <FlexRow className="w-full justify-center items-center">
      {messages.length > 0 ? (
        <ToolbarButton
          Button={DangerButton}
          className="w-full"
          onClick={() => setModalOpen(!modalOpen)}
        >
          There are errors!
        </ToolbarButton>
      ) : null}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        label="Error Messages"
      >
        <FlexCol className="p-6 justify-start items-center rounded-md w-full sm:w-128 h-full">
          <h2 className="mx-auto text-2xl">Errors</h2>
          <div className="w-full flex-1">
            {messages.map((message, key) => (
              <FlexRow key={key} className="w-full justify-between items-center p-2">
                <span className="mr-3">
                  {message}
                </span>
                <span className="ml-3">
                  <ToolbarButton
                    Button={DangerButton}
                    onClick={() => deleteItem(key)}
                  >
                    Delete
                  </ToolbarButton>
                </span>
              </FlexRow>
            ))}
          </div>
          <ToolbarButton
            Button={WarnButton}
            className="w-full mb-2"
            onClick={() => setModalOpen(!modalOpen)}
          >
            Close
          </ToolbarButton>
        </FlexCol>
      </Modal>
    </FlexRow>
  );
}

const mapStateToProps = (state) => ({
  messages: state.errors.errors
});

const mapDispatchToProps = (dispatch) => ({
  deleteItem: (id) => dispatch(clearMessageById(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessages);
