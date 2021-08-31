const avatarPublicId = user_id => {
  const env = process.env.NODE_ENV;
  if (env === 'test') {
    return `_TEST_AVATAR_${user_id}_`;
  }
  if (env === 'development') {
    return `_AVATAR_${user_id}_`;
  }
  if (env === 'production') {
    return `__AVATAR_${user_id}__`;
  }
};
module.exports = avatarPublicId;