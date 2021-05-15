const db = require('../db');

const associate = (singular1, singular2, id1, id2) => db(`${singular1}s_${singular2}s`)
  .insert({
    [`${singular1}_id`]: id1,
    [`${singular2}_id`]: id2,
  })
  .then((result) => result)
  .catch(console.log);

module.exports = associate;
