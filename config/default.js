require('dotenv').config();

const {LINE_ACCESS_TOKEN, LINE_SECRET, PORT, BASE_URL, REDISCLOUD_URL} = process.env;

module.exports = {
  line: {
    channelAccessToken: LINE_ACCESS_TOKEN,
    channelSecret: LINE_SECRET,
  },
  admin: {
    passKey: 'abrakadabra'
  },
  port: PORT ? PORT : 3000,
  baseUrl: BASE_URL ? BASE_URL : 'https://dubiu.serveo.net/',
  redis: {
    url: REDISCLOUD_URL ? REDISCLOUD_URL : 'redis://localhost:32768'
  }
}