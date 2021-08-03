const associate = require('../helpers/associate');
const types = require('../messageTypes');

const addSubjectToTile = (event, params) => {
  associate('subject', 'title', params.subjectId, params.titleId)
    .then((id) => event.reply(types.createSubjectTitle.reply, {
      id,
      success: true
    }))
    .catch((err) => console.log(err));
};

module.exports = addSubjectToTile;
