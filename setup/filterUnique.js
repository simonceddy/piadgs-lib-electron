const filterUnique = (values = []) => {
  const seenValues = {};

  const result = values.filter((value) => {
    if (seenValues[value] === value) return false;
    seenValues[value] = value;

    return true;
  });

  return result;
};

module.exports = filterUnique;
