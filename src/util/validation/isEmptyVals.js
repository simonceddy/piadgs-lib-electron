import isEmpty from './isEmpty';

export default function isEmptyValues(values = {}) {
  const vals = Object.values(values);
  return isEmpty(vals)
    || vals.filter((val) => !isEmpty(val)).length === 0;
}
