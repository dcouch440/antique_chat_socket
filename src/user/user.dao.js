const db = require('../../db');

class UserDAO {
  getUsersByUsername (usernames) {
    return db('user')
      .select('username', 'id', 'avatar')
      .where(builder => builder.whereIn('username', usernames));
  }
  getUserByUsername (username) {
    return db('user')
      .select('username', 'id', 'avatar')
      .where('username', username)
      .first();
  }
}

module.exports = new UserDAO();