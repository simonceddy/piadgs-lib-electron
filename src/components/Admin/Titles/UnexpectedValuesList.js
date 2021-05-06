const AdjacentCols = ({ prev, next }) => (
  <>
    {prev ? <span className="m-1">{`Previous column: ${prev}`}</span> : null}
    {next ? <span className="m-1">{`Next column: ${next}`}</span> : null}
  </>
);

function UnexpectedValuesList({ items = [], visible = false }) {
  if (!visible) {
    return null;
  }
  return (
    <ul>
      {items.map((item, key) => (
        <li key={key}>
          <span>
            {item.val}
          </span>
          <AdjacentCols prev={item.adjacent[0]} next={item.adjacent[1]} />
        </li>
      ))}
    </ul>
  );
}

export default UnexpectedValuesList;
