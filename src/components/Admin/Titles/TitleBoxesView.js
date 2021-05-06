import ProcessedTitleUtils from '../../../containers/Admin/ProcessedTitleUtils';
import renderedValue from '../../../util/renderedValue';
import DataFlexRow from '../../../shared/components/Flex/DataFlexRow';
import TitleMiniFlexbox from './TitleMiniFlexbox';
import UnexpectedValuesBox from './UnexpectedValuesBox';

function TitleBoxesView({ titles = [], cols, filtering }) {
  return (
    <>
      {titles.map((result, key) => (
        filtering && result.unexpectedValues.length < 1 ? null : (
          <TitleMiniFlexbox key={key} title={result}>
            <ProcessedTitleUtils index={key} />
            {cols.map((col, num) => (
              <DataFlexRow key={num} label={col.name}>
                {renderedValue({ value: result[col.key], id: col.key })}
              </DataFlexRow>
            ))}
            {result.unexpectedValues.length < 1 ? null : (
              <UnexpectedValuesBox unexpectedValues={result.unexpectedValues} />
            )}
          </TitleMiniFlexbox>
        )))}
    </>
  );
}

export default TitleBoxesView;
