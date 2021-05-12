import { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import Toolbar from '../../components/Toolbar';
import { Pagination } from '../../components/Pagination';
import TitleTableRow from '../../components/Titles/TitleTableRow';
import { DefaultTable } from '../../shared/components/Tables';
import { fetchTitlesData, setCurrentPage } from '../../store/actions';
import adminColumns from '../../util/adminColumns';
import { CreateIcon, SearchIcon } from '../../shared/components/Icons';
import { FlexCol } from '../../shared/components/Flex';

const toolbarItems = [
  [
    {
      key: 'createTitle',
      Icon: CreateIcon,
    },
  ],
  [
    {
      key: 'searchTitles',
      Icon: SearchIcon,
    },
  ],
];

function Titles({
  titles = [],
  getTitles,
  currentPage,
  setPage,
  sortColumn,
  sortDirection
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
    const data = titles[currentPage - 1];
    if (!data) return null;

    return data.map((title = {}) => (
      <TitleTableRow key={title.id} title={title} columns={adminColumns}>
        {title.title}
      </TitleTableRow>
    ));
  }, [currentPage, titles]);

  return (
    <FlexCol className="w-full h-full justify-start items-center">
      <Toolbar items={toolbarItems} />
      <Pagination
        current={currentPage}
        lastPage={lastPage}
        setPage={setPage}
      />
      <DefaultTable
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        columns={adminColumns}
        handleSort={(key) => console.log(`sorting by ${key}`)}
      >
        {pageData}
      </DefaultTable>
    </FlexCol>
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
