const fs = require('fs');

const countStudents = (dataPath) => {
  if (!fs.existsSync(dataPath) || !fs.statSync(dataPath).isFile()) {
    throw new Error('Cannot load the database');
  }

  const fileContent = fs.readFileSync(dataPath, 'utf-8');
  const lines = fileContent
    .trim()
    .split('\n')
    .filter((line) => line.length > 0);

  if (lines.length <= 1) {
    console.log('Number of students: 0');
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
};

module.exports = countStudents;
