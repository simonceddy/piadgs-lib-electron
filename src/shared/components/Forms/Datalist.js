function Datalist({ data = [], id, mapFn = () => null }) {
  return (
    <datalist
      id={id}
    >
      {data.map(mapFn)}
    </datalist>
  );
}

export default Datalist;
