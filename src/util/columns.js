import SubjectsField from '../containers/Admin/Autocomplete/SubjectsField';
import TitleAuthorsSection from '../containers/Admin/Autocomplete/TitleAuthorsSection';

const columns = [
  {
    name: 'Title',
    key: 'title',
    sortable: true,
  },
  {
    name: 'Author',
    key: 'authors',
    sortable: true,
    Component: ({ values = [] }) => (
      <span className="flex flex-col  justify-start items-start">
        {values.map((author = {}, id) => (
          <span
            key={id}
            className="m-0.5"
          >
            {author.surname}{author.givenNames ? `, ${author.givenNames}` : null}
          </span>
        ))}
      </span>
    ),
    FormComponent: ({ value = [], onChange }) => (
      <TitleAuthorsSection
        value={value}
        setAuthors={(authors) => onChange({ target: { value: authors } })}
      />
    )
  },
  {
    name: 'Subjects',
    key: 'subjects',
    sortable: true,
    Component: ({ values = [] }) => (
      <span className="flex flex-col justify-start items-start">
        {values.map((subject = {}, key) => (
          <span className="m-0.5" key={key}>{subject.name}</span>
        ))}
      </span>
    ),
    FormComponent: ({ value, onChange }) => (
      <SubjectsField
        value={value}
        setSubjects={(subjects) => onChange({ target: { value: subjects } })}
      />
    )
  },
  {
    name: 'Location',
    key: 'callNumber',
    sortable: true,
  },
];

export default columns;
