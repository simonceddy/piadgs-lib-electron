import { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { Pagination } from '../../components/Pagination';
import { fetchTitlesData, setCurrentPage } from '../../store/actions';

function AdminTitles({
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
      <div key={title.id}>
        {title.title}
      </div>
    ));
  }, [currentPage, titles]);

  return (
    <div className="w-full h-full overflow-scroll flex flex-col justify-start items-start">
      <Pagination
        current={currentPage}
        lastPage={lastPage}
        setPage={setPage}
      />
      {pageData}
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminTitles);
