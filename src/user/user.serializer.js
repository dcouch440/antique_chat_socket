/* eslint-disable no-debugger */
const avatarService = require('../avatar/avatar.service');
const getAvatarIfNotPresent = require('../../lib/get-avatar-if-no-present');
const avatarPublicId = require('../../constant/avatar-public-id');

class UserSerializer {
  async serializeWithUserAvatar (user) {
    return this.attachAvatarToUser(user);
  }
  async serializeWithUsersAvatars (users) {
    return this.attachAvatarToUsers(users);
  }
  async attachAvatarToUsers (users) {
    /**
     * this method finds all the users avatars by their ids
     * users[] are mapped through to retrieve their id
     * a for-in style query is made to the cloud to retrieve the ids
     * the response is checked for null value and returns [] incase
     * users[] are mapped through to create the return object
     * the response is mapped through to find the public_id that matches the users name
     * we use the avatarPublicId function to attach a default avatar if one does not exist
     * user data is formed and returned
     */
    const usersIds = users.map(user => user.id);
    const response = await this.getAvatarsAndVerify(usersIds);
    const usersWithAttachedAvatars = response?.resources ?? [];
    return users.map(user => {
      const [avatar] = usersWithAttachedAvatars
        .filter(avatar => avatar['public_id'] === avatarPublicId(user.id));
      return {
        username: user.username,
        avatar: avatar ?? getAvatarIfNotPresent(avatar),
        online: user.online
      };
    });
  }
  async attachAvatarToUser (user) {
    /**
     * this method is used to form the user object with attached avatar
     */
    const avatar = await this.getAvatarAndVerify(user);
    return {
      username: user.username,
      avatar,
      online: user.online
    };
  }
  async getAvatars (ids) {
    return await avatarService.getAvatarsByUserIds(ids);
  }
  async getAvatarAndVerify (user) {
    /**
     * this method finds a user avatar.
     * an avatar is searched in the cloud by the user id.
     * the avatar is checked for null values and a default is given incase of it.
     */
    const { id } = user;
    const avatar = await avatarService.getAvatarByUserId(id);
    return getAvatarIfNotPresent(avatar);
  }
}

module.exports = new UserSerializer();