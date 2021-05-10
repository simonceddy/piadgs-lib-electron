const Title = require('./src/backend/models/Title');

const testModel = async () => {
  const title = new Title({ id: 1152 });

  await title.fetch()
    .then((result) => result.load()
      .then((end) => console.log(end)));
};

testModel();
