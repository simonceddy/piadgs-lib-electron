import { Link } from 'react-router-dom';
import { FetchModelData } from '../../shared/containers';
import TitleInfoContainer from './Titles/TitleInfoContainer';
import TitleLayout from './Titles/TitleLayout';

function TitleView({ data = {} }) {
  return (
    <TitleLayout>
      {!data ? <TitleInfoContainer>Not found</TitleInfoContainer> : (
        <>
          <TitleInfoContainer className="text-2xl">
            {data.title}
          </TitleInfoContainer>
          <TitleInfoContainer className="">
            {data.authors ? data.authors.map((author, key) => (
              <div key={key}>
                <Link to={`/admin/author/${author.id}`}>
                  {author.surname}{author.givenNames ? `, ${author.givenNames}` : null}
                </Link>
              </div>
            )) : null}
          </TitleInfoContainer>
          <TitleInfoContainer className="">
            {data.subjects ? data.subjects.map((subject = {}, key) => (
              <Link to={`/admin/subject/${subject.id}`} className="m-0.5" key={key}>{subject.name}</Link>
            )) : null}
          </TitleInfoContainer>
          <TitleInfoContainer>
            {data.callNumber}
          </TitleInfoContainer>
        </>
      )}
    </TitleLayout>
  );
}

function ViewTitle() {
  return (
    (
      <FetchModelData
        uri="/titles/"
        render={(title) => <TitleView data={title} />}
      />
    )
  );
}

export default ViewTitle;
