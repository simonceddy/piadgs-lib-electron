/* eslint-disable no-unused-vars */
import { useCallback, useState } from 'react';
import { paginate } from '../util/paginate';
import { Pagination } from '../components/Pagination';

export default function usePagination({
  perPage = 32,
  currentPage = 1,
  data = []
}) {
  const [pages, setPages] = useState((data.length > 0 ? paginate(data, perPage) : []));
  const [current, setCurrent] = useState(currentPage);

  const setPage = (pageNumber) => {
    const num = Number(pageNumber);
    if (num < 1) {
      throw Error('pageNumber must be a positive number');
    }
    setCurrent(num);
  };

  const setData = (newData) => setPages(paginate(newData, perPage));

  const Paginator = useCallback(() => (
    <Pagination current={current} lastPage={pages.length} setPage={setPage} />
  ), [current, pages]);

  return {
    setPage,
    current,
    pages,
    Paginator,
    setData
  };
}
