/* eslint-disable no-unused-vars */
const fs = require('fs');
const Papa = require('papaparse');
const processAuthors = require('./old/processors/processAuthors');
const processSubjects = require('./old/processors/processSubjects');
const processParsedCSVData = require('./old/processParsedCSVData');

console.log('bootstrapping app');
const currentCSV = 'Book master - Simon (26 May 2021).csv';
const pathTo = `${__dirname}/storage/${currentCSV}`;
if (fs.existsSync(pathTo)) {
  //
  const csvFIle = fs.createReadStream(pathTo);

  Papa.parse(csvFIle, {
    complete: (results) => processParsedCSVData(
      results.data,
      {
        subjects: processSubjects,
        author: processAuthors
      }
    )
      .then(console.log)
  });
} else {
  console.log('could not locate source data');
}

// TODO
// Set up database - migrations - seed from CSV
