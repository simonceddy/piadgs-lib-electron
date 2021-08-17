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

const associateAuthorTitle = (authorId, titleId) => testDb('authors_titles')
  .insert({
    author_id: authorId,
    title_id: titleId
  })
  .then((result) => result)
  .catch(console.log);

const associateSubjectTitle = (subjectId, titleId) => testDb('subjects_titles')
  .insert({
    subject_id: subjectId,
    title_id: titleId
  })
  .then((result) => result)
  .catch(console.log);

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
  convertCsv(async ({ data, issues }) => {
    // console.log(data);
    await Promise.all(data.map((title) => {
      testDb('titles')
        .insert({
          title: title.title,
          imprint: title.imprint,
          isbn: title.isbn,
          accession_number: title.accession_number,
          source: title.source,
          date: title.date,
          location: title.location,
          cost: title.cost,
          pagination: title.pagination,
        })
        .then((newId) => {
          title.subjects.map(async (subject = {}) => {
            if (subject.name) {
              await testDb('subjects')
                .where('name', subject.name)
                .first()
                .then(async (result) => {
                  if (!result) {
                    testDb('subjects')
                      .insert(subject)
                      .then(async (subjectId) => {
                        await associateSubjectTitle(subjectId[0], newId[0]);
                      })
                      .catch(console.log);
                  } else {
                    associateSubjectTitle(result[0], newId[0]);
                  }
                });
            }
            return subject;
          });

          title.author.map(async (author = {}) => {
            if (author.name) {
              await testDb('authors')
                .where('name', author.name)
                .first()
                .then(async (result) => {
                  if (!result) {
                    testDb('authors')
                      .insert(author)
                      .then(async (authorId) => {
                        await associateAuthorTitle(authorId[0], newId[0]);
                      })
                      .catch(console.log);
                  } else {
                    await associateAuthorTitle(result[0], newId[0]);
                  }
                });
            }
            return author;
          });
        });

      return title;
    }));
  })
    .then(() => {
      console.log('bootstrapped');
    });
} else {
  console.log('could not locate source data');
}

// TODO
// Set up database - migrations - seed from CSV
