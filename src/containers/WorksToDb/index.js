/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import { useState, useCallback } from 'react';
import InputTextArea from '../../components/WorksToDB/InputTextArea';
import {
  clearUnconvertedTextInput,
  processInputText,
  removeConvertedByIndex,
  saveTitle,
  setConvertedTitles,
  setUnconvertedTextInput
} from '../../store/actions';
import { FlexCol, FlexRow } from '../../shared/components/Flex';
import { ThemedButton } from '../../shared/components/Styled';
import WorksToDbToolbar from '../../components/WorksToDB/WorksToDbToolbar';
import TitleBoxes from '../../components/WorksToDB/TitleBoxes';
import TitleTable from '../../components/WorksToDB/TitleTable';

const viewStorageKey = 'workstodb-default-view';

const defaultView = localStorage.getItem(viewStorageKey) || 'boxes';

function WorksToDB({
  input,
  setInput,
  processInput = () => {},
  titles = [],
  clearInput,
  removeTitle = () => {},
  persistOne,
  persistAll = () => {},
  clearAllTitles
}) {
  // First we have a large textarea where rows of data are pasted
  // Second the user submits the form
  // The app attempts to process the given input
  // Where successful, the app will return pending models to be edited further
  // or persisted to database.
  // Any rows that could not be processed correctly are also listed as
  // incomplete conversions
  // User can edit, remove and persist individual models, or store the whole
  // batch at once
  const [showTextarea, setShowTextarea] = useState(true);
  const [viewTable, setViewTable] = useState(
    defaultView === 'table'
  );

  const toggleViewAsTable = () => {
    const newView = viewTable ? 'boxes' : 'table';
    localStorage.setItem(viewStorageKey, newView);
    setViewTable(!viewTable);
  };

  // console.log(titles);
  const ViewBoxes = useCallback(() => (
    <TitleBoxes
      titles={titles}
      persistTitle={persistOne}
      removeTitle={removeTitle}
    />
  ), [titles]);

  const ViewTables = useCallback(() => (
    <TitleTable
      titles={titles}
      persistTitle={persistOne}
      removeTitle={removeTitle}
    />
  ), [titles]);

  return (
    <FlexCol className="w-full h-full md:w-5/6 lg:w-4/5 xl:w-3/4 justify-start items-center p-2">
      <WorksToDbToolbar>
        Toolbar
        <ThemedButton className="m-1" onClick={() => setShowTextarea(!showTextarea)}>
          {showTextarea ? 'Hide' : 'Show'} Text Area
        </ThemedButton>
        {titles.length > 0 ? (
          <>
            <ThemedButton className="m-1" onClick={() => persistAll(titles)}>
              Save All
            </ThemedButton>
            <ThemedButton className="m-1" onClick={clearAllTitles}>
              Remove All
            </ThemedButton>
            <ThemedButton className="m-1" onClick={toggleViewAsTable}>
              View as {viewTable ? 'boxes' : 'table'}
            </ThemedButton>
          </>
        ) : null}
      </WorksToDbToolbar>
      {showTextarea ? (
        <>
          <InputTextArea
            value={input}
            setValue={setInput}
            placeholder="Paste rows from Works DB or Excel here"
          />
          <FlexRow className="p-2 w-full justify-around items-center">
            <ThemedButton
              className="m-2"
              onClick={() => {
                if (input.length > 0) {
                  setShowTextarea(false);
                  processInput();
                }
              }}
            >
              Process Text
            </ThemedButton>
            <ThemedButton className="m-2" onClick={clearInput}>
              Clear Text
            </ThemedButton>
          </FlexRow>
        </>
      ) : null}
      {viewTable ? <ViewTables /> : <ViewBoxes />}
    </FlexCol>
  );
}

const mapStateToProps = (state) => ({
  input: state.worksToDb.input,
  titles: state.worksToDb.titles,
});

const mapDispatchToProps = (dispatch) => ({
  setInput: (input) => dispatch(setUnconvertedTextInput(input)),
  processInput: () => dispatch(processInputText()),
  clearInput: () => dispatch(clearUnconvertedTextInput()),
  removeTitle: (id) => dispatch(removeConvertedByIndex(id)),
  clearAllTitles: () => dispatch(setConvertedTitles([])),
  persistOne: (title) => dispatch(saveTitle(title))
});

export default connect(mapStateToProps, mapDispatchToProps)(WorksToDB);
