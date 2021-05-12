/* eslint-disable no-plusplus */
// eslint-disable-next-line no-unused-vars
const { Knex } = require('knex');
const contains = require('../helpers/contains');
const db = require('../db');
const loadTitleRelations = require('../helpers/loadTitleRelations');

const searchResponseBody = {
  success: false,
  results: [],
  message: null,
};

const fields = {
  title: {
    col: 'title',
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
    col: 'call_number'
  }
};

const respond = (event, data) => event.reply('titles-search-results', data);

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

    if (params.length < 1) {
    // TODO handle no params
      return query;
    }

    let currentQuery = null;

    if (fields[params[0]].handle) {
      currentQuery = query.where(fields[params[0]].handle(data[params[0]]));
    } else {
      currentQuery = query.where(fields[params[0]].col, 'like', `%${data[params[0]]}%`);
    }

    if (params.length > 1) {
      for (let i = 1; i < params.length; i++) {
        if (fields[params[i]].handle) {
          currentQuery = currentQuery.andWhere(fields[params[i]].handle(data[params[i]]));
        } else {
          currentQuery = currentQuery.andWhere(
            fields[params[i]].col, 'like', `%${data[params[i]]}%`
          );
        }
      }
    }
    console.log(currentQuery.toString());
    return currentQuery;
  };

  return makeQuery;
};

const searchTitles = async (event, params) => {
  // TODO handle all inputs

  const q = searchQuery(params)(db('titles'));

  // event.reply('titles-search-results', q.toString());

  // TODO handle loading relations correctly
  const resolved = await q.select(
    'titles.id', 'titles.title', 'titles.call_number'
  )
    .then((results) => {
      if (results.length < 1) {
        return respond(event, { message: 'No results were found.', results });
      }
      // console.log(results);
      return Promise.all(results.map((title) => loadTitleRelations(title)
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

module.exports = searchTitles;
