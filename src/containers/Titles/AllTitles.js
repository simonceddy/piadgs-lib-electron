import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Pagination } from '../../components/Pagination';
import TitleTableRow from '../../components/Titles/TitleTableRow';
import { DefaultTable } from '../../shared/components/Tables';
import { fetchTitlesData, setCurrentPage, sortTitleRows } from '../../store/actions';
import adminColumns from '../../util/adminColumns';

function AllTitles({
  titles = [],
  getTitles,
  currentPage,
  setPage,
  sortColumn,
  sortDirection,
  onRowClick = () => null,
  sortTitles,
  lastPage
}) {
  useEffect(async () => {
    console.log('fetching titles');
    await getTitles();
  }, [currentPage, sortColumn, sortDirection]);

  return (
    <>
      <Pagination
        current={currentPage}
        lastPage={lastPage}
        setPage={setPage}
      />
      {titles.length < 1 ? 'Loading...' : (
        <>
          <DefaultTable
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            columns={adminColumns}
            handleSort={(e) => sortTitles(e.target.id)}
          >
            {titles.map((title = {}) => (
              <TitleTableRow
                onClick={() => onRowClick(title)}
                key={title.id}
                title={title}
                columns={adminColumns}
              />
            ))}
          </DefaultTable>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  itemsPerPage: state.titles.titles.itemsPerPage,
  currentPage: state.titles.titles.currentPage,
  lastPage: state.titles.titles.lastPage,
  titles: state.titles.titles.titles,
  sortDirection: state.titles.titles.sortDirection,
  sortColumn: state.titles.titles.sortColumn,
});

const mapDispatchToProps = (dispatch) => ({
  getTitles: () => dispatch(fetchTitlesData()),
  setPage: (page) => dispatch(setCurrentPage(page)),
  sortTitles: (col) => dispatch(sortTitleRows(col))
});

export default connect(mapStateToProps, mapDispatchToProps)(AllTitles);
