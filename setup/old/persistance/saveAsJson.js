const fs = require('fs');

const saveAsJson = async (data = []) => {
  if (!fs.existsSync('storage/json')) {
    await fs.mkdir('storage/json');
  }

  return Promise.all(data
    .map(async (title) => fs.writeFileSync(
      `storage/json/${title.id}_title.json`,
      JSON.stringify(title)
    )));
};

module.exports = saveAsJson;
