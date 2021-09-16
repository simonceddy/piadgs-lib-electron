import SubjectsField from '../../containers/Admin/Autocomplete/SubjectsField';
import TitleAuthorsSection from '../../containers/Admin/Autocomplete/TitleAuthorsSection';

export const titleCols = [
  {
    key: 'id',
    name: 'ID',
    FormComponent: ({ value }) => (
      <input
        value={value}
        type="hidden"
        id="id"
        name="id"
      />
    )
  },
  {
    key: 'authors',
    name: 'Authors',
    isPublic: true,
    sortable: true,
    Component: ({ values = [] }) => (
      <span className="flex flex-col  justify-start items-start">
        {values.map((author = {}, id) => (
          <span
            key={id}
            className="m-0.5"
          >
            {author.name}
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
    key: 'title',
    name: 'Title',
    isPublic: true,
    sortable: true,
    required: true,
  },
  {
    key: 'imprint',
    name: 'Imprint',
    sortable: true,
  },
  {
    key: 'pagination',
    name: 'pagination',
    sortable: true,
  },
  {
    key: 'isbn',
    name: 'isbn',
    sortable: true,
  },
  {
    key: 'location',
    name: 'location',
    isPublic: true,
    sortable: true,
  },
  {
    key: 'date',
    name: 'date',
    sortable: true,
  },
  {
    key: 'source',
    name: 'source',
    sortable: true,
  },
  {
    key: 'cost',
    name: 'cost',
    sortable: true,
  },
  {
    key: 'accession_number',
    name: 'accession number',
    sortable: true,
  },
  {
    key: 'subjects',
    name: 'subjects',
    isPublic: true,
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
];

export const publicCols = titleCols.filter(({ isPublic }) => (isPublic === true));
