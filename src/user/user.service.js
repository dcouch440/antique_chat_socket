const userDAO = require('./user.dao');

class UserService {
  async getUsersByUsername ({ usernames }) {
    try {
      return await userDAO.getUsersByUsername(usernames);
    } catch (err) {
      console.error(err);
    }
  }
  async getUserByUsername (username) {
    try {
      return await userDAO.getUserByUsername(username);
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = new UserService();