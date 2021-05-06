export default function updateByIndex(data = [], index, value) {
  return data.map((val, id) => {
    if (id !== index) {
      return val;
    }
    return value;
  });
}
