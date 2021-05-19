import { titleModel } from '../../backend/models';
import { FlexCol } from '../../shared/components/Flex';

const defaultData = {
  ...titleModel,
  authors: [],
  subjects: [],
};

function TitleWindow({ title = defaultData }) {
  return (
    <FlexCol className="justify-start items-start w-full">
      <div className="text-2xl w-full">
        {title.title}
      </div>
      <div>
        {title.authors.length > 0 ? 'List authors' : 'No Authors'}
      </div>
      <div>{title.imprint}</div>
      <div>{title.accession_number}</div>
      <div>{title.isbn}</div>
      <div>{title.pagination}</div>
      <div>{title.call_number}</div>
      <div>{title.source}</div>
      <div>{title.date}</div>
      <div>{title.cost}</div>
      <div>
        {title.subjects.length > 0 ? 'List subjects' : 'No Subjects'}
      </div>
    </FlexCol>
  );
}

export default TitleWindow;
