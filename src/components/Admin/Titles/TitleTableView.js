import { DefaultTable } from '../../../shared/components/Tables';
import TitleTableRow from './TitleTableRow';

function TitleTableView({ titles, cols, filtering = false }) {
  return (
    <DefaultTable
      columns={cols}
    >
      {titles.map((title = {}, key) => {
        if (filtering && title.unexpectedValues.length < 1) {
          return null;
        }
        return (
          <TitleTableRow
            key={key}
            columns={cols}
            title={title}
            utilsActive={false}
          />
        );
      })}
    </DefaultTable>
  );
}

export default TitleTableView;
