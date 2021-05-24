/* eslint-disable no-plusplus */
// eslint-disable-next-line no-unused-vars
const { Knex } = require('knex');
const contains = require('../helpers/contains');
const db = require('../db');
const loadTitleRelations = require('../helpers/loadTitleRelations');
const types = require('../messageTypes');
// const titleModel = require('../models/title');

const sortBy = (field) => {
  switch (field) {
    case 'authors':
      return 'authors.surname';
    case 'subjects':
      return 'subjects.name';
    default:
      return `titles.${field}`;
  }
};

const searchResponseBody = {
  success: false,
  totalResults: 0,
  results: [],
  message: null,
};

const fields = {
  title: {
    col: 'titles.title',
    handle(value) {
      return (query) => query.where(...contains('titles.title', value));
    }
  },
  author: {
    col: 'authors',
    handle(value) {
      return (query) => query.where(...contains('authors.surname', value))
        .orWhere(...contains('authors.given_names', value));
    }
  },
  subject: {
    col: 'subjects',
    handle(value) {
      return (query) => query.where(...contains('subjects.name', value));
    }
  },
  callNumber: {
    col: 'titles.call_number'
  }
};

const respond = (event, data) => event.reply(types.searchLibrary.reply, data);

/**
 * Build the search query
 * @param {Object} data Data object
 * @returns {Function(): Knex}
 */
const searchQuery = (data = {}) => {
  /**
   * Query function
   *
   * @param {Knex} query
   * @returns {Knex}
   */
  const makeQuery = (query) => {
    const params = Object.keys(fields)
      .filter((field) => data[field] && data[field].length > 0);

    // console.log(params, data, fields);
    query.innerJoin('authors_titles', 'titles.id', '=', 'authors_titles.title_id')
      .innerJoin('authors', 'authors.id', '=', 'authors_titles.author_id')
      .innerJoin('subjects_titles', 'titles.id', '=', 'subjects_titles.title_id')
      .innerJoin('subjects', 'subjects.id', '=', 'subjects_titles.subject_id');

    const totalParams = params.length;

    if (totalParams < 1) {
    // TODO handle no params
      return query;
    }

    let currentQuery = null;

    if (fields[params[0]].handle) {
      currentQuery = query.where(fields[params[0]].handle(data[params[0]]));
    } else {
      currentQuery = query.where(fields[params[0]].col, 'like', `%${data[params[0]]}%`);
    }

    if (totalParams > 1) {
      for (let i = 1; i < totalParams; i++) {
        if (fields[params[i]].handle) {
          currentQuery = currentQuery.andWhere(fields[params[i]].handle(data[params[i]]));
        } else {
          currentQuery = currentQuery.andWhere(
            fields[params[i]].col, 'like', `%${data[params[i]]}%`
          );
        }
      }
    }
    return currentQuery;
  };

  return makeQuery;
};

// const selectCols = Object.keys(titleModel).map((col) => `titles.${col}`);

const searchLibrary = async (event, {
  sortCol = 'title',
  sortDirection = 'ASC',
  title,
  callNumber,
  author,
  subject,
  page = 1,
  itemsPerPage = 32,
}) => {
  const q = searchQuery({
    title,
    callNumber,
    author,
    subject
  });
  const offset = (page * itemsPerPage) - itemsPerPage;
  // event.reply('titles-search-results', q.toString());
  q(db('titles')).count('titles.id')
    .then((result) => console.log(result));
  // TODO handle loading relations correctly
  const resolved = await q(db('titles'))
    .orderBy(sortBy(sortCol), sortDirection)
    .groupBy('titles.id')
    // .modify((qb) => qb.from('titles').count('titles.id', { as: 'total' }).groupBy('titles.id'))
    .offset(offset)
    .limit(itemsPerPage)
    .select('titles.*')
    .then((results = []) => {
      if (results.length < 1) {
        return respond(event, { message: 'No results were found.', results });
      }

      // TODO fix query
      // const unique = results.filter((title, index, self) => index === self.findIndex(
      //   (t) => (t.id === title.id)
      // ));
      return Promise.all(results.map((t) => loadTitleRelations(t)
        .then((loaded) => loaded)))
        .then((titles) => respond(event, {
          ...searchResponseBody,
          results: titles,
          success: true,
        }));
    })
    .catch((err) => respond(event, {
      ...searchResponseBody,
      message: 'An error has occurred',
      err
    }));

  return resolved;
};

module.exports = searchLibrary;
