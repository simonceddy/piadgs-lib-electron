const db = require('../db');
const associate = require('../helpers/associate');
const saveModel = require('../helpers/saveModel');

const addSubjectsToTitle = (titleId, subjects = []) => Promise.all(
  subjects.map((subject = {}) => {
    if (subject.id) {
      return db('subjects').where('id', subject.id).first()
        .then((result) => associate('subject', 'title', result.id, titleId))
        .catch(console.log);
    }

    return saveModel('subjects', subject)
      .then((id) => associate('subject', 'title', id, titleId))
      .catch(console.log);
  })
);

module.exports = addSubjectsToTitle;
