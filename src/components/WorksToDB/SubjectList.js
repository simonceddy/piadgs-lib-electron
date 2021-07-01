import { FlexCol } from '../../shared/components/Flex';

const SubjectList = ({ subjects = [] }) => (
  <FlexCol className="justify-start items-start">
    {subjects.map(({ name }, key) => (
      <span key={`subject-${key}`}>{name}</span>
    ))}
  </FlexCol>
);

export default SubjectList;
