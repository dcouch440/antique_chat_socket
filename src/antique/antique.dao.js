const Antique = require('./antique.model');

class AntiqueDAO {
  findAntiquesByUserId (user_id) {
    return Antique.query()
      .where('user_id', user_id);
  }
}

module.exports = new AntiqueDAO();