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
  if (key === 'isAdmin') {
    const adminListRaw = await redis.getAsync('adminList');
    let adminList;

    try {
      adminList = JSON.parse(adminListRaw);
    } catch (e) {}

    if (value) {
      if (!adminList) {
        adminList = [];
      }

      if (!adminList.some(admin => admin === userId)) {
        adminList.push(userId);
      }
    } else {
      adminList = adminList.filter(admin => admin !== userId);
    }

    await redis.setAsync('adminList', JSON.stringify(adminList));
  }
  await redis.setAsync(userId, JSON.stringify(status));
  return status;
}

async function updateStatusBulk(e, data) {
  const userId = e.source.userId;
  const status = await getStatus(e);

  const newStatus = Object.assign({}, status, data);

  await redis.setAsync(userId, JSON.stringify(newStatus));
  return newStatus;
}

async function adminCheck(e) {
  const status = await getStatus(e);
  return !!status.isAdmin;
}

async function deleteStatus(e) {
  const userId = e.source.userId;

  await redis.setAsync(userId, JSON.stringify({}));
  return {}
}

async function getAdmin() {
  const data = await redis.getAsync('adminList');
  return JSON.parse(data);
}

module.exports = {
  adminCheck,
  getStatus,
  updateStatus,
  updateStatusBulk,
  deleteStatus,
  getAdmin
}