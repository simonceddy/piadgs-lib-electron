import isEmpty from './validation/isEmpty';

export default function makeSearchQuery(items = {}) {
  const query = new URLSearchParams();

  if (!isEmpty(items)) {
    const keys = Object.keys(items);
    const vals = Object.values(items);

    vals.map((val, id) => (isEmpty(val) ? null : query.append(keys[id], val)));
  }

  return query;
}
