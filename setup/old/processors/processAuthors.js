const splitPattern = /\s&\s/i;

const processAuthors = (authors = '') => authors.split(splitPattern).map((name) => ({ name: name.trim() }));

module.exports = processAuthors;
