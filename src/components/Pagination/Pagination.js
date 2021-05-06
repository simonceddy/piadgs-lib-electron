import PageLink from './PageLink';

function Pagination({
  current,
  lastPage,
  baseUrl = '/'
}) {
  const firstPageUrl = `${baseUrl}1`;
  const next = current < lastPage ? current + 1 : null;
  const previous = current > 1 ? current - 1 : null;

  const previousDisabled = previous === null;
  const nextDisabled = next === null;

  return (
    <div className="flex flex-row border border-black p-3 flex-1 items-center justify-between">
      <div className="flex flex-row items-center justify-between">
        <PageLink url={firstPageUrl} disabled={previousDisabled}>
          First
        </PageLink>
        <PageLink url={`${baseUrl}${previous}`} disabled={previousDisabled}>
          Previous
        </PageLink>

        <PageLink url={`${baseUrl}${next}`} disabled={nextDisabled}>
          Next
        </PageLink>
        <PageLink url={`${baseUrl}${lastPage}`} disabled={nextDisabled}>
          Last
        </PageLink>
      </div>
      {/* pagination links */}
      <span className="mr-2">Page {current} of {lastPage}</span>
    </div>
  );
}

export default Pagination;
