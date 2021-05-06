import { TitleList } from '../../shared/components/Titles';

function AuthorSummary({ author = {} }) {
  return (
    <>
      <div className="text-2xl p-2">
        {author.surname}{!author.givenNames ? null : `, ${author.givenNames}`}
      </div>
      {!author.titles ? null : (
        <TitleList titles={author.titles} />
      )}
      {/* <div className="flex flex-col justify-start items-start p-2">
          {author.titles.map(({ id, title }) => (
            <div key={id}>{title}</div>
          ))}
        </div> */}
    </>
  );
}

export default AuthorSummary;
