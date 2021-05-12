const { searchTitles } = require('./src/backend/controllers');
// const { getFrom } = require('./src/backend/controllers');
// const getAuthorTitles = require('./src/backend/helpers/getAuthorTitles');
const countModels = require('./src/backend/controllers/countModels');
const getAllTitles = require('./src/backend/controllers/getAllTitles');
// const getTotal = require('./src/backend/helpers/getTotal');

const event = {
  reply(...args) {
    // console.log(...args);
  }
};

searchTitles(event, {
  author: 'edd'
});

// getFrom('authors', { id: 66 })
//   .then((author) => getAuthorTitles(author)
//     .then((titles) => ({ ...author, titles })))
//   .then(event.reply);

// countModels('authors', (result) => console.log(result));

// getAllTitles(event);
