import { connect } from 'react-redux';
import DataFlexRow from '../../shared/components/Flex/DataFlexRow';
import {
  DangerButton,
  InfoButton,
  ToolbarButton,
  // WarnButton
} from '../../shared/components/Buttons';
import { postConvertedTitle, removeProcessedById } from '../../store/actions';

function ProcessedTitleUtils({
  index,
  confirmAndSave,
  deleteFromItems
}) {
  return (
    <DataFlexRow>
      <ToolbarButton
        Button={InfoButton}
        onClick={() => confirmAndSave(index)}
      >
        Confirm and Save
      </ToolbarButton>
      <ToolbarButton
        Button={DangerButton}
        onClick={() => deleteFromItems(index)}
      >
        Delete
      </ToolbarButton>
    </DataFlexRow>
  );
}

const mapDispatchToProps = (dispatch) => ({
  confirmAndSave: (index) => dispatch(postConvertedTitle(index)),
  deleteFromItems: (index) => dispatch(removeProcessedById(index))
});

export default connect(null, mapDispatchToProps)(ProcessedTitleUtils);
