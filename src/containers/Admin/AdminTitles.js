import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTitlesData } from '../../store/actions';

function AdminTitles({ titles, getTitles, currentPage }) {
  useEffect(() => {
    if (titles.length < 1) getTitles();
  }, [titles]);

  console.log(titles[currentPage - 1]);
  return (
    <div>
      {}
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
  getTitles: (page, itemsPerPage) => dispatch(fetchTitlesData(page, itemsPerPage)),
  /* setTitlesPerPage: (amount) => dispatch(setItemsPerPage(amount)),
  setSort: (sortColumn, sortDirection) => dispatch(setTitlesSort({
    sortColumn,
    sortDirection
  })) */
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminTitles);
