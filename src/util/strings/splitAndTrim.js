const { split, trim } = require('lodash');

const splitAndTrim = (value, separator = ',') => split(value, separator)
  .map((bit) => trim(bit));

export default splitAndTrim;
