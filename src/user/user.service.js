const getAvatarIfNoPresent = require('../../lib/get-avatar-if-no-present');
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
      const user = await userDAO.getUserByUsername(username);
      const { avatar } = getAvatarIfNoPresent(user);
      return { username: user.username, id: user.id, avatar };
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = new UserService();