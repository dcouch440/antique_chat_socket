const { cloudinary } = require('../config/cloudinary.config');
const avatarPublicIdFormat = require('../../constant/avatar-public-id');

class AvatarDAO {
  findById (id) {
    const avatarPublicId = avatarPublicIdFormat(id);
    return cloudinary.search.expression(
      `public_id=${avatarPublicId}`
    ).execute();
  }
}

module.exports = new AvatarDAO();