import DefaultTable from '../../shared/components/Tables/DefaultTable';
import { fromWorksCols } from '../../shared/data/columns';
import ConvertedTitleRow from './ConvertedTitleRow';
import TitleButtons from './TitleButtons';

function TitleTable({
  titles = [],
  persistTitle = () => null,
  removeTitle = () => null,
}) {
  if (titles.length < 1) return null;

  return (
    <DefaultTable
      className="border-2"
      columns={[{ key: 'buttons', name: '' }, ...fromWorksCols]}
    >
      {titles.map((title = {}) => (
        <ConvertedTitleRow title={title} key={`title-${title.id}`}>
          <td>
            <TitleButtons
              title={title}
              persistTitle={() => persistTitle(title)}
              removeTitle={removeTitle}
            />
          </td>
        </ConvertedTitleRow>
      ))}
    </DefaultTable>
  );
}

export default TitleTable;
