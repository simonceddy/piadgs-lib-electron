// const processSubjects = require('./processors/processSubjects');

const handleResult = ({ data = [], issues = {} }, persist) => {
  console.log(`Transformed ${data.length} titles`);
  const linesWithIssues = Object.keys(issues.issues).length;
  console.log(`${linesWithIssues} lines contained ${issues.totalIssues} total issues`);

  // const startIndex = Math.ceil(Math.random() * data.length);
  // const randomTransformedEntires = data.slice(startIndex, startIndex + 3);
  // console.log('Here is a random title:', randomEntry);
  // console.log((randomTransformedEntires));

  // console.log(Object.values(data));
  if (typeof persist === 'function') {
    try {
      persist(data);
    } catch (error) {
      console.log(error);
    }
  }

  return { data, issues };
};

module.exports = handleResult;
