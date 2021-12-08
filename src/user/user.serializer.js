/* eslint-disable no-debugger */
const getAvatarIfNotPresent = require('../../lib/get-avatar-if-no-present');

class UserSerializer {
  async serializeWithUserAvatar (user) {
    /**
     * this method is used to form the user object with attached avatar
     */
    const avatar = await this.getAvatarAndVerify(user);
    return {
      username: user.username,
      avatar,
    };
  }
  async serializeWithUsersAvatars (users) {
    /**
     * this method finds all the users avatars by their ids.
     * users[] are mapped through to retrieve their id.
     * a for-in style query is made to the cloud to retrieve the ids.
     * the response is checked for null value and returns [] incase.
     * users[] are mapped through to create the return object.
     * the response is mapped through to find the public_id that matches the users name.
     * we use the avatarPublicId function to attach a default avatar if one does not exist.
     * user data is formed and returned
     */

    return users.map(user => {
      const { avatar } = getAvatarIfNotPresent(user);
      return {
        username: user.username,
        avatar,
      };
    });
  }

}

module.exports = new UserSerializer();