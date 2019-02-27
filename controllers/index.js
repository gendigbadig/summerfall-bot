const line = require('@line/bot-sdk');
const config = require('config');
const lineClient = new line.Client(config.line);

const auth = require('./auth');

const follow = require('./follow');
const admin = require('./admin');
const message = require('./message');
const unfollow = require('./unfollow');

/**
 * e - webhook event
 *
 * @param source Source object
 * @param source.type Source Type - user, group, room
 * @param source.userId Source user Id
 * @param source.groupId Source group Id
 * @param source.roomId Source room id
 *
 * @param type Message Type - message
 * @param replyToken Reply token used for replying
 *
 * @param message Message object
 * @param message.type Message type - text,
 *
 * - Text Message
 * @param message.id Message id
 * @param message.text Message text
 *
 * -
 */
async function eventHandler(e) {
  const adminList = await auth.getAdmin();
  const userId = e.source.userId;

  switch (e.type) {
    case 'follow':
      return follow(e, lineClient);
    case 'message':
      // Handle Verification
      if (e.replyToken === "00000000000000000000000000000000" || e.replyToken === "ffffffffffffffffffffffffffffffff") {
        return Promise.resolve(null);
      }

      const profile = await lineClient.getProfile(userId);

      // Admin mode
      if (/^(admin)/i.test(e.message.text)) {
        return admin(e, lineClient);
      }

      if (!adminList.some(admin => admin === userId)) {
        await Promise.all(adminList.map(async(admin) => {
          return lineClient.pushMessage(admin, {
            type: 'text',
            text: `${profile.displayName}: ${e.message.text}`
          })
        }))
      }

      return message(e, lineClient);
    case 'unfollow':
      return unfollow(e);
    default:
      return Promise.resolve(null)
  }
}

module.exports = eventHandler;