import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ItemsPerPageSelector from '../../components/Forms/ItemsPerPageSelector';
import { Pagination } from '../../components/Pagination';
import TitleTableRow from '../../components/Titles/TitleTableRow';
import { FlexRow } from '../../shared/components/Flex';
import Modal from '../../shared/components/Modal';
import { DefaultTable } from '../../shared/components/Tables';
import { titleCols } from '../../shared/data/titleCols';
import {
  fetchTitlesData,
  setCurrentPage,
  setEditingTitle,
  setItemsPerPage,
  sortTitleRows
} from '../../store/actions';
import Title from './Title';

function AllTitles({
  titles = [],
  getTitles,
  currentPage,
  setPage,
  sortColumn,
  sortDirection,
  sortTitles,
  lastPage,
  itemsPerPage,
  setPerPage,
}) {
  // const [showSearchForm, setShowSearchForm] = useState(false);
  const [titleModal, setTitleModal] = useState(false);

  const onClose = () => setTitleModal(false);

  const TitleModal = () => (!titleModal ? null : (
    <Modal
      onClose={onClose}
    >
      <Title
        onClose={onClose}
        title={titleModal}
        onTitleChange={getTitles}
      />
    </Modal>
  ));

  useEffect(async () => {
    // console.log('fetching titles');
    await getTitles();
  }, [currentPage, sortColumn, sortDirection, itemsPerPage]);

  // console.log(titles);

  const onRowClick = (title) => setTitleModal(title);

  return (
    <>
      <TitleModal />
      <FlexRow className="w-full">
        <Pagination
          current={currentPage}
          lastPage={lastPage}
          setPage={setPage}
        />
        <ItemsPerPageSelector
          current={itemsPerPage}
          onChange={(e) => setPerPage(Number(e.target.value))}
        />
      </FlexRow>
      {titles.length < 1 ? 'Loading...' : (
        <>
          <DefaultTable
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            columns={titleCols}
            handleSort={(e) => sortTitles(e.target.id)}
          >
            {titles.map((title = {}) => (
              <TitleTableRow
                onClick={() => onRowClick(title)}
                key={title.id}
                title={title}
                columns={titleCols}
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
  isEditing: state.titles.title.isEditing
});

const mapDispatchToProps = (dispatch) => ({
  getTitles: () => dispatch(fetchTitlesData()),
  setPage: (page) => dispatch(setCurrentPage(page)),
  sortTitles: (col) => dispatch(sortTitleRows(col)),
  setPerPage: (amount) => dispatch(setItemsPerPage(amount)),
  setIsEditing: (isEditing) => dispatch(setEditingTitle(isEditing))
});

export default connect(mapStateToProps, mapDispatchToProps)(AllTitles);
