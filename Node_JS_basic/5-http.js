const http = require('http');
const fs = require('fs');

const PORT = 1245;
const HOST = '127.0.0.1';
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';

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

/**
 * Creates and configures the HTTP server.
 */
const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    const responseText = 'This is the list of our students\n';

    countStudents(DB_FILE)
      .then((report) => {
        res.end(`${responseText}${report}`);
      })
      .catch((err) => {
        res.end(`${responseText}${err.message}`);
      });
  } else {
    res.end('Hello Holberton School!');
  }
});

app.listen(PORT, HOST);

module.exports = app;
