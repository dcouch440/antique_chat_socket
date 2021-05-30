const envUrl = ({ localhost, production }) => {
  const env = process.env.NODE_ENV;
  if (env === 'production') {
    return production;
  } else {
    return `http://localhost:${localhost}`;
  }
};

module.exports = envUrl;