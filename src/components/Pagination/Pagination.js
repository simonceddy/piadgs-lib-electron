import { useCallback } from 'react';
import {
  PrimaryBorderDiv,
  StyledSelect
} from '../../shared/components/Styled';
import PageLink from './PageLink';

const normalizePage = (page, lastPage) => {
  if (page < 1) return 1;
  if (page > lastPage) return lastPage;
  return page;
};

const getOptions = (max) => {
  const options = [];
  for (let i = 1; i <= max; i++) {
    options.push(() => <option id={i} value={i} label={i} />);
  }

  return options;
};

function Pagination({
  current = 1,
  lastPage,
  setPage = () => null
}) {
  const currentPage = normalizePage(current, lastPage);
  // TODO fix select
  const Options = useCallback(
    () => getOptions(lastPage)
      .map((Option, index) => <Option key={index} />),
    [lastPage]
  );

  return (
    <PrimaryBorderDiv className="flex flex-row border p-1 items-center justify-between w-full">
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
      <span className="mr-2">
        <span className="mr-2">Page</span>
        <StyledSelect
          value={currentPage || 1}
          className="p-1 border-2 rounded-xl text-lg cursor-pointer mr-2"
          onChange={(e) => setPage(Number(e.target.value))}
        >
          <Options />
        </StyledSelect>
        of {lastPage}
      </span>
    </PrimaryBorderDiv>
  );
}

export default Pagination;
