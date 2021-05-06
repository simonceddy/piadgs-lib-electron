import axios from 'axios';
import { useState } from 'react';

export default function useAutocompleteSubjects() {
  const [subjects, setSubjects] = useState([]);

  const fetchSubjects = (values) => {
    axios.get(`/subjects/search?name=${values}`)
      .then((res) => setSubjects(res.data.results))
      .catch((err) => console.log(err));
  };

  return {
    subjects,
    fetchSubjects
  };
}
