const avatarDAO = require('./avatar.dao');

class AvatarService {
  async getAvatarByUserId (id) {
    try {
      return avatarDAO.findById(id);
    } catch (err) {
      console.error(err);
    }
  }
  async getAvatarsByUserIds (id) {
    try {
      return avatarDAO.findByIds(id);
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = new AvatarService();