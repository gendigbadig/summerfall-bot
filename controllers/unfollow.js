const auth = require('./auth');

module.exports = function unfollow(e) {
  return auth.deleteStatus(e);
}