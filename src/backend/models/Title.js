// const db = require('../db');
const getFrom = require('../controllers/getId');
const getTitleAuthors = require('../helpers/getTitleAuthors');
const getTitleSubjects = require('../helpers/getTitleSubjects');

const columns = [
  'id',
  'title',
  'imprint',
  'isbn',
  'accession_number',
  'source',
  'date',
  'call_number',
  'cost',
  'pagination',
];

function Title(attributes = {}, options = {}) {
  if (!(this instanceof Title)) {
    return new Title(attributes, options);
  }
  let isLoaded = false;

  this.id = attributes.id || null;

  this.attributes = Object.fromEntries(
    columns.map((val) => [val, attributes[val] || null])
  );

  this.previousAttributes = {};

  this.relations = {
    subjects: null,
    authors: null
  };

  const getIndex = () => {
    if (!this.id) {
      throw Error('No title id is set!');
    }
    return this.id;
  };

  const loadData = async () => {
    await getFrom('titles', { id: getIndex() })
      .then((result) => {
        this.attributes = result;
        this.previousAttributes = result;
        isLoaded = true;
      });
  };

  this.authors = async () => {
    if (!this.relations.authors) {
      await getTitleAuthors({
        id: getIndex()
      })
        .then((result) => {
          this.relations.authors = result;
        })
        .catch(console.log);
    }
    return this.relations.authors;
  };

  this.subjects = async () => {
    if (!this.relations.subjects) {
      await getTitleSubjects({
        id: getIndex()
      })
        .then((result) => {
          this.relations.subjects = result;
        })
        .catch(console.log);
    }
    return this.relations.subjects;
  };

  this.fetch = async () => {
    await loadData();
    return this;
  };

  this.load = async () => {
    await this.authors();
    await this.subjects();

    return this;
  };

  this.flatten = () => {
    if (!isLoaded) loadData();
    return {
      ...this.attributes,
      ...this.relations
    };
  };

  return this;
}

module.exports = Title;
