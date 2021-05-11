function ResultRow({ data, columns = [] }) {
  return (
    <tr>
      {columns.map(({ key }) => (
        <td key={`${key}-${data.id}`}>
          {data[key] || ''}
        </td>
      ))}
    </tr>
  );
}

export default ResultRow;
