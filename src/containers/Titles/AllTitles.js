import { useEffect, useMemo, useState } from 'react';
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
  sortTitles
}) {
  const [titlesLoaded, setTitlesLoaded] = useState(titles.length > 0);
  const [loadedPage, setLoadedPage] = useState(currentPage);

  const lastPage = titles.length;

  useEffect(async () => {
    if (currentPage !== loadedPage) {
      setLoadedPage(currentPage);
      await getTitles();
    }
    if (!titlesLoaded) {
      await getTitles();
      setTitlesLoaded(true);
    }
  }, [currentPage]);

  const pageData = useMemo(() => {
    if (!titles) return null;

    return titles.map((title = {}) => (
      <TitleTableRow
        onClick={() => onRowClick(title)}
        key={title.id}
        title={title}
        columns={adminColumns}
      >
        {title.title}
      </TitleTableRow>
    ));
  }, [currentPage]);

  return (
    <>
      {!titlesLoaded ? 'Loading...' : (
        <>
          <Pagination
            current={currentPage}
            lastPage={lastPage}
            setPage={setPage}
          />
          <DefaultTable
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            columns={adminColumns}
            handleSort={(e) => sortTitles(e.target.id)}
          >
            {pageData}
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
