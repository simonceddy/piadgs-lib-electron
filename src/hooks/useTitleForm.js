import { useState } from 'react';

const defaultValues = {
  id: '',
  title: '',
  authors: [],
  subjects: [],
  isbn: '',
  callNumber: '',
  date: '',
  source: '',
  cost: '',
  imprint: '',
  pagination: '',
  accessionNumber: '',
};

export default function useTitleForm() {
  const [values, setValues] = useState(defaultValues);
  const [message, setMessage] = useState(null);

  const setValue = (vals = {}) => setValues({ ...values, ...vals });

  const resetForm = () => setValues(defaultValues);

  return {
    values,
    setValue,
    setValues,
    message,
    setMessage,
    resetForm
  };
}
