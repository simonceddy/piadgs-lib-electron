function SubjectResultRow({ subject = {}, onClick }) {
  return (
    <tr id={`subject-row-${subject.id}`} onClick={onClick}>
      <td>
        {subject.name}
      </td>
      <td>
        {subject.total ? subject.total : '0'}
      </td>
    </tr>
  );
}

export default SubjectResultRow;
