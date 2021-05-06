import ShowSubject from './ShowSubject';
import { ThemedDiv } from '../../shared/components/Styled';

function SubjectList({ subjects = [], sortBy = () => null }) {
  return (
    <div className="flex flex-col justify-start items-start flex-1 w-full p-2 overflow-scroll h-full">
      <ThemedDiv className="flex flex-row justify-between items-center w-full border-b-2 py-2">
        <button type="button" onClick={() => sortBy('name')} className="hover:underline">
          Subject Name
        </button>
        <button type="button" onClick={() => sortBy('titles')} className="hover:underline">
          Number of Titles
        </button>
      </ThemedDiv>
      {subjects.map((subject = {}) => (
        <ShowSubject subject={subject} key={subject.id} />
      ))}
    </div>
  );
}

export default SubjectList;
