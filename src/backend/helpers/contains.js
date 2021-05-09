const contains = (col, value) => [col, 'like', `%${value}%`];

module.exports = contains;
