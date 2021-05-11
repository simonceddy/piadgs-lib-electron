// const { searchTitles } = require('./src/backend/controllers');
const { getFrom } = require('./src/backend/controllers');
const getAuthorTitles = require('./src/backend/helpers/getAuthorTitles');

const event = {
  reply(...args) {
    console.log(...args);
  }
};

// searchTitles(event, {
//   title: 'the'
// });

getFrom('authors', { id: 66 })
  .then((author) => getAuthorTitles(author)
    .then((titles) => ({ ...author, titles })))
  .then(event.reply);
