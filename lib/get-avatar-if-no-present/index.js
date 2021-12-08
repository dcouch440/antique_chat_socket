const avatarImage = require('./default-avatar');

/**
 *
 * @param {object} avatar
 * @returns {object|void} original avatar or new avatar if not present
 *
 */

const getAvatarIfNoPresent = user => {
  try {
    // if avatar exists return user
    const { avatar } = user ?? {};
    if (avatar) {
      return user;
    } else {
      // else attach default avatar
      return {
        ...user,
        ...avatarImage
      };
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = getAvatarIfNoPresent;