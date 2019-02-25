const redis = require('redis');
const config = require('config');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis);
const client = redis.createClient(config.redis.url, {no_ready_check: true});

module.exports = client;