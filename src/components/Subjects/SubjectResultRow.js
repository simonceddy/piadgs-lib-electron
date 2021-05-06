function SubjectResultRow({ subject = {}, onClick }) {
  return (
    <tr id={`subject-row-${subject.id}`} onClick={onClick}>
      <td>
        {subject.name}
      </td>
      <td>
        {subject.titles ? subject.titles.length : '0'}
      </td>
    </tr>
  );
}

export default SubjectResultRow;
