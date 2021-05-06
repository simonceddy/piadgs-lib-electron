import { FlexCol } from '../shared/components/Flex';

const rows = {
  authors(authors = []) {
    return (
      <FlexCol>
        {authors.map((author, key) => (
          <span key={key}>
            {`${author.surname}${author.givenNames ? `, ${author.givenNames}` : ''}`}
          </span>
        ))}
      </FlexCol>
    );
  },
  subjects(subjects = []) {
    return (
      <FlexCol>
        {subjects.map((subject, key) => (
          <span key={key}>{subject.name}</span>
        ))}
      </FlexCol>
    );
  }
};

const renderedValue = ({ id, value }) => (!rows[id] ? value : rows[id](value));

export default renderedValue;
