const { searchTitles } = require('./src/backend/controllers/searchTitles');

const event = {
  reply(type, data) {
    console.log(type, data.results);
  }
};

searchTitles(event, {
  title: 'the'
});
