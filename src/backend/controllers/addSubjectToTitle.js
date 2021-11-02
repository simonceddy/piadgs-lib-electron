const associate = require('../helpers/associate');
const saveModel = require('../helpers/saveModel');
const types = require('../messageTypes');

const associateWithIds = (event, subjectId, titleId) => associate('subject', 'title', subjectId, titleId)
  .then((id) => event.reply(types.createSubjectTitle.reply, {
    id,
    success: true,
    subjectId,
    titleId
  }))
  .catch((err) => console.log(err));

const addSubjectToTile = async (event, params) => {
  if (!params.subjectId && params.name) {
    return saveModel('subjects', {
      name: params.name
    }).then((ids) => {
      console.log('IDS', ids);
      const [subjectId] = ids;
      return associateWithIds(event, subjectId, params.titleId);
    });
  }
  return associateWithIds(event, params.subjectId, params.titleId);
};

module.exports = addSubjectToTile;
