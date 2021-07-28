const splitPattern = /\s\s+/i;
const replacePattern = /^\d\./i;

const processSubjects = (subjects = '') => {
  if (!subjects.split) console.log(subjects);
  return subjects.split(splitPattern)
    .map((subject = '') => ({
      name: subject.replace(replacePattern, '').trim()
    }));
};

module.exports = processSubjects;
