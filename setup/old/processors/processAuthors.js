// const splitPattern = /\s&\s/i;

// const processAuthors = (authors = '') => authors
// .split(splitPattern).map((name) => ({ name: name.trim() }));
const processAuthors = (authors = '') => ([{ name: authors.trim() }]);

module.exports = processAuthors;
