const secretKey = 'This is very Secretg';
const refreshTokenSecret = 'yourrefreshtokensecrethere';
// we can create another table to store the refresh token of the user
var refreshTokens = [];

module.exports = {
  secretKey,
  refreshTokenSecret,
  refreshTokens,
};
