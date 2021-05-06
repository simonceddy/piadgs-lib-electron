import { FlexCol, FlexRow } from '../../shared/components/Flex';
import { ListLink } from '../../shared/components/List';
import { FetchModelData } from '../../shared/containers';

function SubjectView({ subject }) {
  console.log(subject);
  return (
    <FlexCol className="flex-1 w-full justify-start items-center p-1">
      <FlexRow className="p-1">{subject.name}</FlexRow>

      <FlexCol className="p-1 justify-start w-full">
        <h2 className="text-3xl">Titles:</h2>
        {subject.titles.map((title = {}) => (
          <ListLink to={`/admin/title/${title.id}`} key={title.id}>
            {title.title}
          </ListLink>
        ))}
      </FlexCol>
    </FlexCol>
  );
}

function ViewSubject() {
  return (
    (
      <FetchModelData
        uri="/subjects/"
        render={(subject) => (
          <SubjectView subject={subject} />
        )}
      />
    )
  );
}

export default ViewSubject;
