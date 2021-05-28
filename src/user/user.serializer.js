const avatarService = require('../avatar/avatar.service');
const getAvatarIfNotPresent = require('../../lib/get-avatar-if-no-present');

class UserSerializer {
  async serializeWithUserAvatar (user) {
    return Array.isArray(user) ?
      await this.attachAvatarToUsers(user):
      await this.attachAvatarToUser(user);
  }
  async attachAvatarToUsers (users) {
    const usersWithAttachedAvatars = users.map(async user => {
      const avatar = await this.getAvatarAndVerify(user);
      return {
        username: user.username,
        avatar,
        online: user.online
      };
    });
    return Promise.all(usersWithAttachedAvatars);
  }
  async attachAvatarToUser (user) {
    const avatar = await this.getAvatarAndVerify(user);
    return {
      username: user.username,
      avatar,
      online: user.online
    };
  }
  async getAvatarAndVerify (user) {
    const { id } = user;
    const avatar = await avatarService.getAvatarByUserId(id);
    return getAvatarIfNotPresent(avatar);
  }
}

module.exports = new UserSerializer();