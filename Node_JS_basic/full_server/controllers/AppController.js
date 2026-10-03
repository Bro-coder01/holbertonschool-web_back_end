/**
 * Controller for application root endpoints.
 */
class AppController {
  /**
   * Handles request for homepage route.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  static getHomepage(req, res) {
    res.status(200).send('Hello Holberton School!');
  }
}

export default AppController;
