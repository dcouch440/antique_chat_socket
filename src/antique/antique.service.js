const antiqueDAO = require('./antique.dao');

class AntiqueService {
  async getUserAntiques (user_id) {
    try {
      return antiqueDAO.findAntiquesByUserId(user_id);
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = new AntiqueService();