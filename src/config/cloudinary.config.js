const cloudinary = require('cloudinary').v2;

let CLOUD_NAME, API_KEY, API_SECRET;

(() => {
  const env = process.env.NODE_ENV;
  const setValue = envKey => process.env[envKey];
  if (env === 'production') {
    CLOUD_NAME = setValue('PRODUCTION_CLOUDINARY_API_NAME');
    API_KEY = setValue('PRODUCTION_CLOUDINARY_API_KEY');
    API_SECRET = setValue('PRODUCTION_CLOUDINARY_API_SECRET');
  } else if (env === 'development') {
    CLOUD_NAME = setValue('CLOUDINARY_API_NAME');
    API_KEY = setValue('CLOUDINARY_API_KEY');
    API_SECRET = setValue('CLOUDINARY_API_SECRET');
  } else if (env === 'test') {
    CLOUD_NAME = setValue('TEST_CLOUDINARY_API_NAME');
    API_KEY = setValue('TEST_CLOUDINARY_API_KEY');
    API_SECRET = setValue('TEST_CLOUDINARY_API_SECRET');
  }
})();

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
});

module.exports = { cloudinary };