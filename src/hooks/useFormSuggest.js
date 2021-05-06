import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useFormSuggest(uri = (val) => val) {
  const [data, setData] = useState([]);
  const [inputVal, setInputVal] = useState('');

  useEffect(async () => {
    if (inputVal.length >= 3) {
      await axios.get(uri(inputVal))
        .then((res) => setData(res.data.results))
        .catch((err) => console.log(err));
    }
  }, [inputVal]);

  return {
    data,
    inputVal,
    setInputVal
  };
}
