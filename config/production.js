const {LINE_ACCESS_TOKEN, LINE_SECRET, PORT} = process.env;

module.exports = {
  line: {
    channelAccessToken: LINE_ACCESS_TOKEN,
    channelSecret: LINE_SECRET
  },
  port: PORT ? PORT : 3000,
}