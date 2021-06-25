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

export default function useTitleForm(initialValues = defaultValues) {
  const [values, setValues] = useState(initialValues);
  const [message, setMessage] = useState(null);

  const setValue = (vals = {}) => setValues({ ...values, ...vals });

  const resetForm = () => setValues(initialValues);

  return {
    values,
    setValue,
    setValues,
    message,
    setMessage,
    resetForm
  };
}
