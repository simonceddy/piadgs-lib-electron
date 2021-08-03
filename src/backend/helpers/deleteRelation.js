const db = require('../db');

const deleteRelation = (firstModel, secondModel, firstId, secondId) => db(
  `${firstModel}s_${secondModel}s`
)
  .where(`${firstModel}_id`, firstId)
  .andWhere(`${secondModel}_id`, secondId)
  .delete()
  .then((success) => success)
  .catch(console.log);

module.exports = deleteRelation;
