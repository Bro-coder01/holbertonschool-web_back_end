const fs = require('fs');

const countStudents = (dataPath) => new Promise((resolve, reject) => {
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
      console.log('Number of students: 0');
      resolve();
      return;
    }

    const studentLines = lines.slice(1);
    console.log(`Number of students: ${studentLines.length}`);

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
      console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
    }

    resolve();
  });
});

module.exports = countStudents;
