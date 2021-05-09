export const paginate = (arr, size) => arr.reduce((acc, val, i) => {
  const idx = Math.floor(i / size);
  const page = acc[idx] || (acc[idx] = []);
  page.push(val);

  return acc;
}, []);
