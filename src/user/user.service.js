const userDAO = require('./user.dao');

class UserService {
  async getUsersByUsername ({ usernames }) {
    try {
      const users = await userDAO.getUsersByUsername(usernames);

      const usersWithIdAndUsername = users.map(user => {
        return { username: user.username, id: user.id };
      });

      return usersWithIdAndUsername;
    } catch (err) {
      console.error(err);
    }
  }
  async getUserByUsername (username) {
    try {
      const user = await userDAO.getUserByUsername(username);
      return { username: user.username, id: user.id };
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = new UserService();