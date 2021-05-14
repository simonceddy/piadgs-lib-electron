import PageLink from './PageLink';
import PageSelect from './PageSelect';

function Pagination({
  current = 1,
  lastPage,
  setPage = () => null
}) {
  // console.log(current);
  const currentPage = current <= lastPage ? current : lastPage;

  return (
    <div className="flex flex-row border border-black p-3 flex-1 items-center justify-between w-full">
      <div className="flex flex-row items-center justify-between">
        <PageLink onClick={() => setPage(1)} disabled={currentPage === 1}>
          First
        </PageLink>
        <PageLink onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </PageLink>

        <PageLink onClick={() => setPage(currentPage + 1)} disabled={currentPage === lastPage}>
          Next
        </PageLink>
        <PageLink onClick={() => setPage(lastPage)} disabled={currentPage === lastPage}>
          Last
        </PageLink>
      </div>
      <div>
        <PageSelect
          current={currentPage}
          lastPage={lastPage}
          onChange={(e) => setPage(Number(e.target.value))}
        />
      </div>
      <span className="mr-2">Page {currentPage} of {lastPage}</span>
    </div>
  );
}

export default Pagination;
