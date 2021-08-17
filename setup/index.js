/* eslint-disable no-unused-vars */
const fs = require('fs');
const Papa = require('papaparse');
const testDb = require('./database/testDb');
const processAuthors = require('./old/processors/processAuthors');
const processSubjects = require('./old/processors/processSubjects');
const processParsedCSVData = require('./old/processParsedCSVData');

console.log('bootstrapping app');
const currentCSV = 'Book master - Simon (26 May 2021).csv';
const pathTo = `${__dirname}/storage/${currentCSV}`;

const convertCsv = async (onConverted) => {
  const csvFIle = fs.createReadStream(pathTo);

  Papa.parse(csvFIle, {
    complete: (results) => processParsedCSVData(
      results.data,
      {
        subjects: processSubjects,
        author: processAuthors
      }
    )
      .then((result) => {
        if (onConverted && typeof onConverted === 'function') onConverted(result);
      })
  });
};

if (fs.existsSync(pathTo)) {
  convertCsv(({ data, issues }) => {
    Promise.all(data.map((title) => {
      title.subjects.map(async (subject = {}) => {
        if (subject.name) {
          await testDb('subjects')
            .where('name', subject.name)
            .first()
            .then((result) => {
              if (!result) {
                testDb('subjects')
                  .insert(subject)
                  .then(console.log);
                // console.log(subject);
              }
            });
        }
        return subject;
      });

      title.author.map((author = {}) => {
        if (author.name) {
          //
        }
        return author;
      });
      return title;
    }))
      .then(console.log);
  });
} else {
  console.log('could not locate source data');
}

// TODO
// Set up database - migrations - seed from CSV
