import fs from 'fs';

/**
 * Reads the database asynchronously and processes students by field.
 * @param {String} filePath - The path to the CSV database file.
 * @returns {Promise<Object>} An object with fields as keys and arrays of firstnames as values.
 */
const readDatabase = (filePath) => new Promise((resolve, reject) => {
  if (!filePath) {
    reject(new Error('Cannot load the database'));
    return;
  }

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }

    const lines = data
      .trim()
      .split('\n')
      .filter((line) => line.length > 0);

    if (lines.length <= 1) {
      resolve({});
      return;
    }

    const studentLines = lines.slice(1);
    const fields = {};

    studentLines.forEach((line) => {
      const record = line.split(',');
      const firstname = record[0];
      const field = record[3];

      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(firstname);
    });

    resolve(fields);
  });
});

export default readDatabase;
