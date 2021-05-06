import { useEffect, useState } from 'react';

function Datalist({
  value, id, mapFn = () => null, fetchFn = () => null
}) {
  // const [lastValue, setLastValue] = useState(value);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (value.length >= 3) {
      // if (value !== lastValue) setLastValue(value);
      // console.log(lastValue);
      fetchFn(value, setData);
    } else if (data.length > 0) {
      setData([]);
    }
  }, [value]);

  return (
    <datalist
      id={id}
    >
      {data.map(mapFn)}
    </datalist>
  );
}

export default Datalist;
