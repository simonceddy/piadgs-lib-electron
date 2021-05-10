// const Title = require('./src/backend/models/Title');

const getFrom = require('./src/backend/controllers/getId');
const getSubjectTitles = require('./src/backend/helpers/getSubjectTitles');

// const testModel = async () => {
//   const title = new Title({ id: 1152 });

//   await title.fetch()
//     .then((result) => result.load()
//       .then((end) => console.log(end)));
// };

// testModel();
getFrom('subjects', { id: 1448 })
  .then((subject) => getSubjectTitles(subject)
    .then((titles) => ({ ...subject, titles })))
  .then((result) => console.log(result));
