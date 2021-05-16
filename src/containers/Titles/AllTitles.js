import { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { Pagination } from '../../components/Pagination';
import TitleTableRow from '../../components/Titles/TitleTableRow';
import { DefaultTable } from '../../shared/components/Tables';
import { fetchTitlesData, setCurrentPage } from '../../store/actions';
import adminColumns from '../../util/adminColumns';

function AllTitles({
  titles = [],
  getTitles,
  currentPage,
  setPage,
  sortColumn,
  sortDirection,
  onRowClick = () => null
}) {
  const [titlesLoaded, setTitlesLoaded] = useState(titles.length > 0);

  const lastPage = titles.length;

  useEffect(async () => {
    if (!titlesLoaded) {
      await getTitles();
      setTitlesLoaded(true);
    }
  }, [titles]);

  const pageData = useMemo(() => {
    if (titles.length < 1) {
      return null;
    }
    const page = currentPage > lastPage ? lastPage : currentPage;
    const data = titles[page - 1];
    if (!data) return null;

    return data.map((title = {}) => (
      <TitleTableRow
        onClick={() => onRowClick(title)}
        key={title.id}
        title={title}
        columns={adminColumns}
      >
        {title.title}
      </TitleTableRow>
    ));
  }, [currentPage, titles]);

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
            handleSort={(e) => console.log(`sorting by ${e.target.id}`)}
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
  setPage: (page) => dispatch(setCurrentPage(page))
  /* setTitlesPerPage: (amount) => dispatch(setItemsPerPage(amount)),
  setSort: (sortColumn, sortDirection) => dispatch(setTitlesSort({
    sortColumn,
    sortDirection
  })) */
});

export default connect(mapStateToProps, mapDispatchToProps)(AllTitles);
