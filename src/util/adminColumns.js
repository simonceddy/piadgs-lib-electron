import columns from './columns';

const adminColumns = [
  // {
  //   key: 'id',
  //   name: 'ID',
  //   sortable: true,
  //   FormComponent: ({ value }) => (
  //     <input
  //       value={value}
  //       type="hidden"
  //       id="id"
  //       name="id"
  //     />
  //   )
  // },
  ...columns,
  {
    key: 'accession_number',
    name: 'Accession Number',
    sortable: true,
  },
  {
    key: 'isbn',
    name: 'ISBN',
    sortable: true,
  },
  {
    key: 'imprint',
    name: 'imprint',
    sortable: true,
  },
  {
    key: 'pagination',
    name: 'pagination',
    sortable: true,
  },
  {
    key: 'cost',
    name: 'cost',
    sortable: true,
  },
  {
    key: 'source',
    name: 'source',
    sortable: true,
  },
  {
    key: 'date',
    name: 'date',
    sortable: true,
  },
];

export default adminColumns;
