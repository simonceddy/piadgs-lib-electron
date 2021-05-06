import { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import adminColumns from '../../util/adminColumns';
import PasteFromWorksToolbar from './PasteFromWorksToolbar';
import {
  AdaptiveFlexbox,
  FlexCol,
  // FlexRow
} from '../../shared/components/Flex';
import { LgFormButton, LgTextArea } from '../../shared/components/Forms';
import TitleBoxesView from '../../components/Admin/Titles/TitleBoxesView';
import TitleTableView from '../../components/Admin/Titles/TitleTableView';
import {
  clearAll,
  processCurrentText,
  setCurrentText,
  setShowOnlyIssues
} from '../../store/actions';
import ErrorMessages from './ErrorMessages';

const cols = [
  ...adminColumns
];

function PasteFromWorks({
  filtering,
  setCurrent,
  processText,
  current,
  results,
  isProcessed,
  clear
}) {
  const [view, setView] = useState(0);
  const [showTextarea, setShowTextarea] = useState(true);

  const submitData = () => {
    if (current.length > 0) {
      processText();
      setShowTextarea(false);
    }
  };

  // console.log(results[0]);

  const ViewBoxes = useMemo(() => (
    <TitleBoxesView
      titles={results}
      cols={cols}
      filtering={filtering}
    />
  ), [results, filtering]);

  const ViewTable = useMemo(() => (
    <TitleTableView
      titles={results}
      cols={cols}
      filtering={filtering}
    />
  ), [results, filtering]);

  return (
    <FlexCol className="flex-1 w-full p-2 overflow-scroll">
      <PasteFromWorksToolbar
        resetForm={() => {
          if (!showTextarea) setShowTextarea(true);
          clear();
        }}
        setView={setView}
        view={view}
        setShowTextArea={setShowTextarea}
        showTextArea={showTextarea}
      />
      <ErrorMessages />
      <FlexCol className="w-full px-2 pb-3 pt-2">
        {showTextarea ? (
          <>
            <LgTextArea
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
            />
            {isProcessed ? (null) : (
              <LgFormButton onClick={submitData}>Submit</LgFormButton>
            )}
          </>
        ) : null}
      </FlexCol>
      {results.length > 0 ? (
        <AdaptiveFlexbox className="justify-around flex-wrap">
          {view === 1 ? ViewTable : ViewBoxes}
        </AdaptiveFlexbox>

      ) : null}

    </FlexCol>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setFiltering: () => dispatch(setShowOnlyIssues()),
  setCurrent: (val) => dispatch(setCurrentText(val)),
  processText: () => dispatch(processCurrentText()),
  clear: () => dispatch(clearAll()),
});

const mapStateToProps = (state) => ({
  filtering: state.admin.pasteFromWorks.showOnlyIssues,
  current: state.admin.pasteFromWorks.currentText,
  results: state.admin.pasteFromWorks.processedResults,
});

export default connect(mapStateToProps, mapDispatchToProps)(PasteFromWorks);
