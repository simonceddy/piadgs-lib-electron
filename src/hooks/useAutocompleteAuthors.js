import axios from 'axios';
import { useState } from 'react';

export default function useAutocompleteAuthors() {
  const [authors, setAuthors] = useState([]);

  const fetchAuthors = (values) => {
    axios.get(`/authors/search?name=${values}`)
      .then((res) => setAuthors(res.data.results))
      .catch((err) => console.log(err));
  };

  return {
    authors,
    fetchAuthors
  };
}
