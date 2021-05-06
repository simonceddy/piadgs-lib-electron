import { connect } from 'react-redux';
import { useMemo } from 'react';
import { FlexCol, FlexRow } from '../../shared/components/Flex';
import {
  DangerButton,
  InfoButton,
  ToolbarButton,
  WarnButton
} from '../../shared/components/Buttons';
import { setShowOnlyIssues } from '../../store/actions';

// TODO tidy up this mess
function PasteFromWorksToolbar({
  results,
  setFiltering,
  filtering,
  resetForm,
  view,
  setView,
  showTextArea,
  setShowTextArea,
  isProcessed = false
}) {
  const totalUnexpected = useMemo(() => results.filter(
    (result) => result.unexpectedValues.length > 0
  ).length, [results]);

  return (
    <FlexRow className="py-2 px-3 justify-start items-center w-full">
      <FlexCol className="justify-around items-start w-1/2 sm:w-1/3">
        {isProcessed ? (
          <>
            <div className="m-0.5">
              Converted input into {results.length} pending records.
            </div>
            <div className="m-0.5">
              {totalUnexpected > 0 ? (
                <>
                  {totalUnexpected} records contain unexpected values.
                </>
              ) : (
                <>
                  No unexpected values found. Hooray!
                </>
              )}
            </div>
          </>
        ) : 'Awaiting input'}
      </FlexCol>
      <FlexRow className="justify-start items-center p-1 flex-1">
        {isProcessed ? (
          <>
            <FlexRow className="mr-4">
              <ToolbarButton
                Button={InfoButton}
                onClick={() => setView(view === 0 ? 1 : 0)}
                disabled={results.length < 1}
              >
                Confirm And Save All
              </ToolbarButton>
              <ToolbarButton
                Button={InfoButton}
                onClick={() => setView(view === 0 ? 1 : 0)}
              >
                View {view === 0 ? 'Table' : 'Boxes'}
              </ToolbarButton>
            </FlexRow>
            <FlexRow>
              {totalUnexpected > 0 ? (
                <ToolbarButton
                  Button={WarnButton}
                  onClick={setFiltering}
                >
                  {filtering ? 'Turn Off Filter' : 'Filter Entries With Errors'}
                </ToolbarButton>
              ) : null}
            </FlexRow>
          </>
        ) : null}
        <FlexRow className="flex-1" />
        <FlexRow>

          <ToolbarButton onClick={() => setShowTextArea(!showTextArea)}>
            {showTextArea ? 'Hide' : 'Show'} Text
          </ToolbarButton>
          <ToolbarButton
            Button={DangerButton}
            onClick={resetForm}
          >
            Clear All
          </ToolbarButton>
        </FlexRow>
      </FlexRow>
    </FlexRow>
  );
}

const mapStateToProps = (state) => ({
  filtering: state.admin.pasteFromWorks.showOnlyIssues,
  results: state.admin.pasteFromWorks.processedResults,
  isProcessed: state.admin.pasteFromWorks.isProcessed
});

const mapDispatchToProps = (dispatch) => ({
  setFiltering: () => dispatch(setShowOnlyIssues())
});

export default connect(mapStateToProps, mapDispatchToProps)(PasteFromWorksToolbar);
