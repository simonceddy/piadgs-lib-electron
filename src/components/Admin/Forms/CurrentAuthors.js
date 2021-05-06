import { FlexCol } from '../../../shared/components/Flex';
import FlexRow from '../../../shared/components/Flex/FlexRow';

function CurrentAuthors({ authors = [] }) {
  if (authors.length < 1) {
    return null;
  }

  return (
    <FlexCol>
      {authors.map((author, key) => (
        <FlexRow key={key}>
          {`${author.surname}${author.givenNames ? `, ${author.givenNames}` : null}`}
        </FlexRow>
      ))}
    </FlexCol>
  );
}

export default CurrentAuthors;
