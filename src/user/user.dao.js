const db = require('../../db');

class UserDAO {
  getUsersByUsername (usernames) {
    return db('user')
      .where(builder => builder.whereIn('username', usernames));
  }
  getUserByUsername (username) {
    return db('user')
      .where('username', username)
      .first();
  }
}

module.exports = new UserDAO();