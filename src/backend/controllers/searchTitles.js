/* eslint-disable no-unused-vars */
const contains = require('../helpers/contains');
const db = require('../db');
const { titleModel } = require('../models');

/**
 * Create a search query function
 * @param {object} params The search input params
 * @returns {Function}
 */
const searchQuery = (params) => {
  const data = Object.keys(titleModel)
    .filter((key) => params[key] !== undefined)
    .map((key) => [key, params[key]]);

  console.log(data);
  if (data.length < 1) return false;
  /**
   * The search query method
   * @param {db} query the Knex queryBuilder
   * @returns {db}
   */
  const handler = (query) => {
    query.where(...contains(...data.shift()));

    const paramCount = data.length;

    for (let i = 0; i < paramCount; i++) {
      query.andWhere(...contains(...data[i]));
    }

    return query;
  };
  return handler;
};

const searchTitles = (event, params) => {
  // TODO - handle searching different columns
  const q = searchQuery(params);
  if (!q) {
    return event.reply('titles-search-results', {
      success: false
    });
  }

  return db.from('titles').where(q)
    .select()
    .then((results) => event.reply('titles-search-results', {
      results,
      success: true
    }))
    .catch((err) => console.log(err));
};

module.exports = searchTitles;
