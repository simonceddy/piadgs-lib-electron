const columns = {
  id: {
    key: 'id',
    name: 'id',
    sortable: true,
  },
  author: {
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
            {author.surname}{author.given_names ? `, ${author.given_names}` : null}
          </span>
        ))}
      </span>
    ),
  },
  title: {
    name: 'Title',
    key: 'title',
    sortable: true,
  },
  imprint: {
    key: 'imprint',
    name: 'Imprint',
    sortable: true,
  },
  pagination: {
    key: 'pagination',
    name: 'Pagination',
    sortable: true
  },
  isbn: {
    key: 'isbn',
    name: 'ISBN',
    sortable: true,
  },
  location: {
    key: 'call_number',
    name: 'location',
    sortable: true,
  },
  date: {
    key: 'date',
    name: 'date',
    sortable: true,
  },
  source: {
    key: 'source',
    name: 'source',
    sortable: true,
  },
  cost: {
    key: 'cost',
    name: 'Cost',
    sortable: true,
  },
  accessionNumber: {
    key: 'accession_number',
    name: 'accession number',
    sortable: true,
  },
  subjects: {
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
  }
};

export default columns;
