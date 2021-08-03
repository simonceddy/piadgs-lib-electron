const deleteRelation = require('../helpers/deleteRelation');
const types = require('../messageTypes');

const removeSubjectFormTitle = (event, params = {}) => {
  deleteRelation('subject', 'title', params.titleId, params.subjectId)
    .then((result) => {
      console.log(result);
      return event.reply(
        types.deleteSubjectTitle.reply,
        { success: true }
      );
    })
    .catch(console.log);
};

module.exports = removeSubjectFormTitle;
