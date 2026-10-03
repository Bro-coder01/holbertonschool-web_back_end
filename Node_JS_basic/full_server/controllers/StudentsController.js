import readDatabase from '../utils';

/**
 * Controller for student-related endpoints.
 */
class StudentsController {
  /**
   * Retrieves and outputs all students grouped by field in alphabetical order.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  static getAllStudents(req, res) {
    const dbPath = process.argv[2] || '';

    readDatabase(dbPath)
      .then((fields) => {
        const responseParts = ['This is the list of our students'];
        const sortedFields = Object.keys(fields).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

        sortedFields.forEach((field) => {
          const students = fields[field];
          responseParts.push(
            `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`,
          );
        });

        res.status(200).send(responseParts.join('\n'));
      })
      .catch(() => {
        res.status(500).send('Cannot load the database');
      });
  }

  /**
   * Retrieves students for a specified major parameter (CS or SWE).
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  static getAllStudentsByMajor(req, res) {
    const { major } = req.params;

    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    const dbPath = process.argv[2] || '';

    readDatabase(dbPath)
      .then((fields) => {
        const students = fields[major] || [];
        res.status(200).send(`List: ${students.join(', ')}`);
      })
      .catch(() => {
        res.status(500).send('Cannot load the database');
      });
  }
}

export default StudentsController;
