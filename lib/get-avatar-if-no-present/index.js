const avatarImage = require('./default-avatar');

const getAvatarIfNotPresent = avatar => {
  try {
    const { resources } = avatar;
    if (resources.length) {
      const [ava] = resources;
      return ava;
    } else {
      return avatarImage;
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = getAvatarIfNotPresent;