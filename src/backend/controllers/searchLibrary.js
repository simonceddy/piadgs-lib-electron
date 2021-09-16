/* eslint-disable no-plusplus */
const db = require('../db');
const loadTitleRelations = require('../helpers/loadTitleRelations');
const types = require('../messageTypes');
const wildcardStringQuery = require('../helpers/wildcardStringQuery');
// const titleModel = require('../models/title');

const sortBy = (field) => {
  switch (field) {
    case 'authors':
      return 'authors.name';
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
      return (query) => wildcardStringQuery(query, 'titles.title', value);
    }
  },
  author: {
    col: 'authors.name',
    handle(value) {
      return (query) => wildcardStringQuery(query, 'authors.name', value);
    }
  },
  subject: {
    col: 'subjects.name',
    handle(value) {
      return (query) => wildcardStringQuery(query, 'subjects.name', value);
    }
  },
  location: {
    col: 'titles.location',
    handle(value) {
      return (query) => wildcardStringQuery(query, 'titles.location', value);
    }
  }
};

const respond = (event, data) => event.reply(types.searchLibrary.reply, data);

const searchQuery = (data = {}) => {
  /**
   * Query function
   *
   * @param {db} query
   * @returns {db}
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
      currentQuery = wildcardStringQuery(query, fields[params[0].col], data[params[0]]);
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
  location,
  author,
  subject,
  page = 1,
  itemsPerPage = 32,
}) => {
  const q = searchQuery({
    title,
    location,
    author,
    subject
  });
  const offset = (page * itemsPerPage) - itemsPerPage;
  // event.reply('titles-search-results', q.toString());
  return q(db('titles')).countDistinct('titles.id', { as: 'total' })
    .then(async (result) => {
      const { total } = result[0];
      const resolved = q(db('titles'))
        .orderBy(sortBy(sortCol), sortDirection)
        .distinct('titles.id')
        .offset(offset)
        .limit(itemsPerPage);
      console.log(resolved.toSQL());

      return resolved
        .select('titles.*')
        .then((results = []) => {
          if (results.length < 1) {
            return respond(event, { message: 'No results were found.', results });
          }
          return Promise.all(results.map((t) => loadTitleRelations(t)
            .then((loaded) => loaded)))
            .then((titles) => {
              console.log(titles);
              return respond(event, {
                ...searchResponseBody,
                results: titles,
                success: true,
                totalResults: total
              });
            })
            .catch(console.error);
        });

      // return resolved;
    })
    .catch(console.error);
};

module.exports = searchLibrary;
