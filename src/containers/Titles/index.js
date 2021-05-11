import { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { Pagination } from '../../components/Pagination';
import TitleTableRow from '../../components/Titles/TitleTableRow';
import { fetchTitlesData, setCurrentPage } from '../../store/actions';
import adminColumns from '../../util/adminColumns';

function Titles({
  titles = [],
  getTitles,
  currentPage,
  setPage
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
    const data = titles[currentPage - 1];
    if (!data) return null;

    return data.map((title = {}) => (
      <TitleTableRow key={title.id} title={title} columns={adminColumns}>
        {title.title}
      </TitleTableRow>
    ));
  }, [currentPage, titles]);

  return (
    <>
      <Pagination
        current={currentPage}
        lastPage={lastPage}
        setPage={setPage}
      />
      {pageData}
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

export default connect(mapStateToProps, mapDispatchToProps)(Titles);
