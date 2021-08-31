const { cloudinary } = require('../config/cloudinary.config');
const avatarPublicIdFormat = require('../../constant/avatar-public-id');

class AvatarDAO {
  findById (id) {
    const avatarPublicId = avatarPublicIdFormat(id);
    return cloudinary.search.expression(
      `public_id=${avatarPublicId}`
    ).execute();
  }
  findByIds (ids) {
    const avatarPublicId = ids.map(id => avatarPublicIdFormat(id));
    return new Promise((resolve, reject) => {
      cloudinary.api.resources_by_ids(
        avatarPublicId, (error, results) => {
          resolve(results);
          reject(error);
        }
      );
    });
  }
}

module.exports = new AvatarDAO();