const redis = require('../connectors/redis');

/**
 * Status Object
 * @param {Boolean} isAdmin Check whether the user is admin or not
 * @param {Boolean} isHasFirstPresent Check whether the user has received first present
 */

async function getStatus(e) {
  const userId = e.source.userId;
  const statusRaw = await redis.getAsync(userId);
  if (!statusRaw) {
    return {}
  }
  return JSON.parse(statusRaw);
}

async function updateStatus(e, key, value) {
  const userId = e.source.userId;
  const status = await getStatus(e);

  status[key] = value;
  await redis.setAsync(userId, JSON.stringify(status));
  return status;
}

async function adminCheck(e) {
  const status = await getStatus(e);
  return !!status.isAdmin;
}

module.exports = {
  adminCheck,
  getStatus,
  updateStatus
}