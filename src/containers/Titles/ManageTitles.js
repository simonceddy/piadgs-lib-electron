import { connect } from 'react-redux';
import {
  fetchTitlesData,
  setCurrentPage,
  setEditingTitle,
  setItemsPerPage,
  sortTitleRows
} from '../../store/actions';

function ManageTitles() {
  // Titles header
  // Toolbar - pagination
  // Search form toggled
  // Main display - list all by default - list results if filtering

  // Use this to centralise title observables
  // E.g. update data when title is updated/removed
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
  isEditing: state.titles.title.isEditing
});

const mapDispatchToProps = (dispatch) => ({
  getTitles: () => dispatch(fetchTitlesData()),
  setPage: (page) => dispatch(setCurrentPage(page)),
  sortTitles: (col) => dispatch(sortTitleRows(col)),
  setPerPage: (amount) => dispatch(setItemsPerPage(amount)),
  setIsEditing: (isEditing) => dispatch(setEditingTitle(isEditing))
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageTitles);
