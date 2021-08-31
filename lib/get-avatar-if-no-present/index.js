const avatarImage = require('./default-avatar');
/**
 * If there is no avatar at all - undefined or null then the avatar image is returned
 * This is what the ?. is used for.
 * if there are resources or no image present then the default is returned
 * avatarImage is returned in the catch because if an error happens where the avatar image for some reason throws and error
 * then it would bring down the front end if the the lack of image is not error handled.
 */

const getAvatarIfNotPresent = avatar => {
  try {
    if (avatar?.resources?.length) {
      const [ava] = avatar.resources;
      return ava;
    } else {
      return avatarImage;
    }
  } catch (err) {
    console.error(err);
    return avatarImage;
  }
};

module.exports = getAvatarIfNotPresent;