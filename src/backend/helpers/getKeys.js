const mergeKeyVals = (keys = [], data = {}) => Object.fromEntries(
  keys.filter((key) => data[key] !== undefined)
    .map((key) => [key, data[key]])
);

module.exports = mergeKeyVals;
