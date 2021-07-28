const Papa = require('papaparse');
const processSubjects = require('./processors/processSubjects');
const processParsedCSVData = require('./processParsedCSVData');

/**
 * @param {fs.ReadStream} csvFile The data file
 * @param {Function} onComplete A callback to be run once parsing is complete
 */
const parseCSVFile = (csvFile, onComplete = () => null) => Papa.parse(csvFile, {
  complete: async (results) => {
    const processedData = await processParsedCSVData(results.data)
      .then(({ data, issues }) => {
        const processed = data.map((result = {}, index) => ({
          ...result,
          id: index,
          subjects: result.subjects ? processSubjects(result.subjects) : []
        }));
        return onComplete({ data: processed, issues });
      });
    // console.log(processedData);
    return processedData;
  }
});

module.exports = parseCSVFile;
