const db = require('../db');

// NOTE - very basic pluralisation
const associate = async (singular1, singular2, id1, id2) => {
  console.log(id1, id2);

  return db(`${singular1}s_${singular2}s`)
    .insert({
      [`${singular1}_id`]: id1,
      [`${singular2}_id`]: id2,
    })
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch(console.log);
};

module.exports = associate;
