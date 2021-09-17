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
            {author.name}
          </span>
        ))}
      </span>
    ),
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
  },
  {
    name: 'Location',
    key: 'location',
    sortable: true,
  },
];

export default columns;
