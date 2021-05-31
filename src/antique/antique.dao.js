const db = require('../../db');

class AntiqueDAO {
  findAntiquesByUserId (user_id) {
    return db('antique')
      .where('user_id', user_id);
  }
}

module.exports = new AntiqueDAO();