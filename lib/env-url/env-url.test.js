const envUrl = require('./index');

describe('envUrl', () => {
  it('return a production url', () => {
    process.env.NODE_ENV = 'production';
    const url = 'https://customUrl.com';
    expect(envUrl({ localhost:3000, production:url }))
      .toEqual(url);
  });
  it('return a non localHostUrl url', () => {
    process.env.NODE_ENV = 'development';
    const url = 'https://customUrl.com';
    expect(envUrl({ localhost:3000, production:url }))
      .toEqual('http://localhost:3000');
  });
  it('returns localhost if nothing is set', () => {
    process.env.NODE_ENV = null;
    const url = 'https://customUrl.com';
    expect(envUrl({ localhost:3000, production:url }))
      .toEqual('http://localhost:3000');
  });
});