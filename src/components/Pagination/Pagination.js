import PageLink from './PageLink';

function Pagination({
  current = 1,
  lastPage,
  setPage = () => null
}) {
  return (
    <div className="flex flex-row border border-black p-3 flex-1 items-center justify-between w-full">
      <div className="flex flex-row items-center justify-between">
        <PageLink onClick={() => setPage(1)} disabled={current === 1}>
          First
        </PageLink>
        <PageLink onClick={() => setPage(current - 1)} disabled={current === 1}>
          Previous
        </PageLink>

        <PageLink onClick={() => setPage(current + 1)} disabled={current === lastPage}>
          Next
        </PageLink>
        <PageLink onClick={() => setPage(lastPage)} disabled={current === lastPage}>
          Last
        </PageLink>
      </div>
      <span className="mr-2">Page {current} of {lastPage}</span>
    </div>
  );
}

export default Pagination;
