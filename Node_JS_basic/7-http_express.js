const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 1245;

/**
 * Reads and processes student data asynchronously from a CSV file.
 * @param {String} dataPath - The path to the CSV database file.
 * @returns {Promise<String>}
 */
const countStudents = (dataPath) => new Promise((resolve, reject) => {
  if (!dataPath) {
    reject(new Error('Cannot load the database'));
    return;
  }

  fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }

    const lines = data
      .trim()
      .split('\n')
      .filter((line) => line.length > 0);

    if (lines.length <= 1) {
      resolve('Number of students: 0');
      return;
    }

    const studentLines = lines.slice(1);
    const responseParts = [`Number of students: ${studentLines.length}`];

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

    for (const [field, students] of Object.entries(fields)) {
      responseParts.push(
        `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`,
      );
    }

    resolve(responseParts.join('\n'));
  });
});

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  const dbFile = process.argv.length > 2 ? process.argv[2] : '';
  const responseText = 'This is the list of our students\n';

  countStudents(dbFile)
    .then((report) => {
      res.send(`${responseText}${report}`);
    })
    .catch((err) => {
      res.send(`${responseText}${err.message}`);
    });
});

app.listen(PORT);

module.exports = app;
