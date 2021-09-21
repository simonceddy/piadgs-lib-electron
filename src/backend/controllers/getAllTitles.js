// const db = require('../db');
const db = require('../db');
// const getPageOfModels = require('../helpers/getPageOfModels');
const loadTitleRelations = require('../helpers/loadTitleRelations');
const types = require('../messageTypes');
const { titleModel } = require('../models');

const sortBy = (column) => {
  switch (column) {
    case 'authors':
      return 'authors.name';
    case 'subjects':
      return 'subjects.name';
    default:
      return `titles.${column}`;
  }
};

const getAllTitles = (event, {
  itemsPerPage = 32,
  page = 1,
  sortColumn = 'id',
  sortDirection = 'ASC',
  filter = {}
}) => {
  const offset = (page * itemsPerPage) - itemsPerPage;
  const sortCol = sortBy(sortColumn);
  // console.log(sortCol);
  const q = db('titles')
    .leftOuterJoin('authors_titles', 'titles.id', '=', 'authors_titles.title_id')
    .leftOuterJoin('authors', 'authors.id', '=', 'authors_titles.author_id')
    .leftOuterJoin('subjects_titles', 'titles.id', '=', 'subjects_titles.title_id')
    .leftOuterJoin('subjects', 'subjects.id', '=', 'subjects_titles.subject_id')
    .orderBy(sortCol, sortDirection)
    .offset(offset)
    .limit(itemsPerPage)
    .groupBy('titles.id');

  if (filter.title) {
    q.where('titles.title', 'like', `%${filter.title}%`);
  }

  return q.select(
    'titles.id',
    ...Object.keys(titleModel).map((key) => `titles.${key}`),
    'titles.created_at',
    'titles.updated_at'
  )
    .then((rows) => rows)
    .catch(console.log)
    // TODO make this better/part of same query?
    .then((rows) => Promise.all(rows.map((title) => loadTitleRelations(title)))
      // .then((result) => result)
      .then((result) => event.reply(types.getAllTitles.reply, result))
      .catch((err) => event.reply(types.getAllTitles.reply, err)))
    .catch((err) => event.reply(types.getAllTitles.reply, err));
};

module.exports = getAllTitles;
