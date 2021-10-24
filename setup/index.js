/* eslint-disable no-unused-vars */
const fs = require('fs');
const bcrypt = require('bcrypt');
const Papa = require('papaparse');
const testDb = require('./database/testDb');
const processAuthors = require('./old/processors/processAuthors');
const processSubjects = require('./old/processors/processSubjects');
const processParsedCSVData = require('./old/processParsedCSVData');
const vals = require('./vals');

console.log('bootstrapping app');
const currentCSV = 'catalogue - master 4 Oct. 2021.csv';
// const currentCSV = 'Book master - Simon (26 May 2021).csv';
const pathTo = `${__dirname}/storage/${currentCSV}`;

testDb('users')
  .where('username', vals.username)
  .first()
  .then((result) => {
    console.log(result);
    if (!result) {
      testDb('users').insert({
        username: vals.username,
        password: bcrypt.hashSync(vals.password, 4)
      })
        .then((success) => {
          console.log(success);
        });
    }
  })
  .catch(console.log);

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

const storeAuthor = (author) => testDb('authors')
  .insert(author)
  .then((result) => result[0] || false)
  .catch(console.log);

const storeSubject = (subject) => testDb('subjects')
  .insert(subject)
  .then((result) => result[0] || false)
  .catch(console.log);

const storeAuthorsAndSubjects = async (data) => {
  const authors = {};
  const subjects = {};

  await Promise.all(data.map(async (row = {}) => {
    if (row.author && row.author.length > 0) {
      const filtered = row.author.filter(({ name }) => {
        if (!authors[name] && name !== '') {
          authors[name] = true;
          return true;
        }

        return false;
      });
      await Promise.all(filtered.map(async (a = {}) => {
        if (a.name && a.name !== '') {
          // console.log(a);
          await testDb('authors')
            .where('name', a.name)
            .first()
            .then(async (result) => {
              // console.log(result);
              if (!result) {
                return storeAuthor(a);
              }
              return result;
            });
        }
        return a;
      }));
    }
    return row;
  }))
    .then(() => {
      console.log('authors stored');
    });

  await Promise.all(data.map(async (row) => {
    if (row.subjects && row.subjects.length > 0) {
      const filtered = row.subjects.filter(({ name }) => {
        if (!subjects[name] && name !== '') {
          subjects[name] = true;
          return true;
        }

        return false;
      });
      await Promise.all(filtered.map(async (a = {}) => {
        if (a.name && a.name !== '') {
          // console.log(a);
          await testDb('subjects')
            .where('name', a.name)
            .first()
            .then(async (result) => {
              // console.log(result);
              if (!result) {
                return storeSubject(a);
              }
              return result;
            });
        }
        return a;
      }));
    }
    return subjects;
  }))
    .then(() => {
      console.log('subjects stored');
    });
};

if (fs.existsSync(pathTo)) {
  convertCsv(async ({ data }) => {
    storeAuthorsAndSubjects(data)
      .then(async () => {
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
            .then(async (newId) => {
              await Promise.all(title.subjects.map(async (subject = {}) => {
                if (subject.name) {
                  await testDb('subjects')
                    .where('name', subject.name)
                    .first()
                    .then(async (result) => {
                      // console.log(result);
                      if (result) {
                        associateSubjectTitle(result.id, newId[0])
                          .catch(console.log);
                      } else {
                        console.log(subject.name);
                      }
                    });
                }
                return subject;
              }));

              await Promise.all(title.author.map(async (author = {}) => {
                if (author.name) {
                  await testDb('authors')
                    .where('name', author.name)
                    .first()
                    .then(async (result) => {
                      if (result) {
                        associateAuthorTitle(result.id, newId[0])
                          .catch(console.log);
                      }
                    });
                }
                return author;
              }));
            });
          return title;
        }))
          .then(() => console.log('titles stored'));
      });
  }).then(() => console.log('done'));
} else {
  console.log('could not locate source data');
}

// TODO
// Set up database - migrations - seed from CSV
