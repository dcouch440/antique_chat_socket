const User = require('./user.model');

class UserDAO {
  getUsersByUsername (usernames) {
    return User.query()
      .where(builder => builder.whereIn('username', usernames));
  }
  getUserByUsername (username) {
    return User.query()
      .where('username', username)
      .first();
  }
}

module.exports = new UserDAO();