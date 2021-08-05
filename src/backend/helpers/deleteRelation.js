const db = require('../db');

const deleteRelation = (firstModel, secondModel, firstId, secondId) => {
  const q = db(
    `${firstModel}s_${secondModel}s`
  )
    .where(`${firstModel}_id`, firstId)
    .andWhere(`${secondModel}_id`, secondId);

  // q.select().then(console.log);

  // console.log(q.toSQL());
  return q.delete()
    .then((success) => success)
    .catch(console.log);
};
module.exports = deleteRelation;
