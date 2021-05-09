import { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import {
  fetchTitlesData, setItemsPerPage, setTitlesSort
} from '../../store/actions';
import adminColumns from '../../util/adminColumns';
import { FlexRow } from '../../shared/components/Flex';
import { Pagination } from '../../components/Pagination';
import { StyledSelect } from '../../shared/components/Styled';
import TitlesTable from '../../components/Admin/Titles/TitlesTable';

const perPageChoices = [
  16, 20, 32, 40, 64, 128
];

function AdminTitles({
  titles = [],
  fetchData,
  sortColumn,
  sortDirection,
  currentPage,
  page = 1,
  lastPage,
  itemsPerPage = 40,
  setTitlesPerPage,
  setSort
}) {
  if (!page || page < 1) {
    return <Redirect to="/admin/titles/1" />;
  }
  // console.log(titles);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState(null);

  const onDelete = (id) => {
    console.log(`deleting title with id: ${id}`);
    axios.post('/titles/delete', { id })
      .then((res) => {
        if (res.data.success) {
          Promise.resolve(() => setMessage('successfully deleted title!'))
            .then(() => setIsLoaded(false));
        } else {
          setMessage('There was an error!');
        }
      })
      .catch((err) => setMessage(err.message));
  };

  const loadData = useCallback(() => Promise.resolve(fetchData(page))
    .then(() => setIsLoaded(true)), [page, itemsPerPage]);

  useEffect(() => {
    if ((!Number.isNaN(page) && page !== currentPage)) {
      setIsLoaded(false);
    }
    if (!isLoaded) {
      loadData();
    }
  }, [isLoaded, page]);

  if (lastPage && page > lastPage) {
    return <Redirect to={`/admin/titles/${lastPage}`} />;
  }

  const handleSort = (col) => {
    const sortDir = sortDirection === 'ASC' ? 'DESC' : 'ASC';

    return Promise.resolve(setSort(
      col,
      col === sortColumn ? sortDir : sortDirection
    ))
      .then(() => setIsLoaded(false))
      .catch((err) => setMessage(err.message));
  };

  const handleItemsPerPage = (e) => Promise.resolve(setTitlesPerPage(Number(e.target.value)))
    .then(() => setIsLoaded(false))
    .catch((err) => setMessage(err.message));

  return (
    <div className="flex-1 w-full flex flex-col justify-start items-center">
      <FlexRow className="p-2 justify-between items-center w-full">
        <div>
          Items per page:
          <StyledSelect
            className="border p-1 ml-1"
            defaultValue={itemsPerPage}
            onChange={handleItemsPerPage}
          >
            {perPageChoices.map((num, key) => (
              <option
                value={num}
                label={num}
                key={key}
              />
            ))}
          </StyledSelect>
        </div>
        <Pagination
          current={currentPage}
          lastPage={lastPage}
          baseUrl="/admin/titles/"
        />
      </FlexRow>
      {message !== null ? (<div>{message}</div>) : null}
      {!isLoaded ? (
        <div>
          Fetching titles...
        </div>
      ) : (
        <TitlesTable
          sortCol={sortColumn}
          columns={adminColumns}
          handleSort={(e) => {
            handleSort(
              e.target.id,
              sortDirection === 'ASC' ? 'DESC' : 'ASC'
            );
          }}
          sortDirection={sortDirection}
          titles={titles}
          rowOnClick={({ id }) => setIsEditing(id)}
          isEditing={isEditing}
          onDelete={onDelete}
        />
      )}
      <FlexRow className="p-2 justify-between items-center w-full">
        <Pagination
          current={currentPage}
          lastPage={lastPage}
          baseUrl="/admin/titles/"
        />
      </FlexRow>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchData: (page, itemsPerPage) => dispatch(fetchTitlesData(page, itemsPerPage)),
  setTitlesPerPage: (amount) => dispatch(setItemsPerPage(amount)),
  setSort: (sortColumn, sortDirection) => dispatch(setTitlesSort({
    sortColumn,
    sortDirection
  }))
});

const mapStateToProps = (state) => ({
  itemsPerPage: state.titles.titles.itemsPerPage,
  currentPage: state.titles.titles.currentPage,
  lastPage: state.titles.titles.lastPage,
  titles: state.titles.titles.titles,
  sortDirection: state.titles.titles.sortDirection,
  sortColumn: state.titles.titles.sortColumn,
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminTitles);
