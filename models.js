const { searchTitles, searchAuthors } = require('./src/backend/controllers');
// const { getFrom } = require('./src/backend/controllers');
// const getAuthorTitles = require('./src/backend/helpers/getAuthorTitles');
const countModels = require('./src/backend/controllers/countModels');
const getAllTitles = require('./src/backend/controllers/getAllTitles');
const saveModel = require('./src/backend/helpers/saveModel');
// const getTotal = require('./src/backend/helpers/getTotal');

const event = {
  reply(...args) {
    console.log(...args);
  }
};

searchAuthors(event, {
  surname: 'medical'
});

/* saveModel('authors', {
  surname: 'Medical Doctor',
  given_names: 'Doctor'
}); */
// getFrom('authors', { id: 66 })
//   .then((author) => getAuthorTitles(author)
//     .then((titles) => ({ ...author, titles })))
//   .then(event.reply);

// countModels('authors', (result) => console.log(result));

// getAllTitles(event);
