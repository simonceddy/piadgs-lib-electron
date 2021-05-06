import { FlexCol, FlexRow } from '../../shared/components/Flex';
import { ListLink } from '../../shared/components/List';
import { FetchModelData } from '../../shared/containers';

function AuthorView({ author }) {
  console.log(author);
  return (
    <FlexCol className="flex-1 w-full justify-start items-center p-1">
      <FlexRow className="p-1">
        {author.surname}{author.givenNames ? `, ${author.givenNames}` : null}
      </FlexRow>

      <FlexCol className="p-1 justify-start w-full">
        <h2 className="text-3xl">Titles:</h2>
        {author.titles.map((title = {}) => (
          <ListLink to={`/admin/title/${title.id}`} key={title.id}>
            {title.title}
          </ListLink>
        ))}
      </FlexCol>
    </FlexCol>
  );
}

function ViewAuthor() {
  return (
    (
      <FetchModelData
        uri="/authors/"
        render={(author) => <AuthorView author={author} />}
      />
    )
  );
}

export default ViewAuthor;
