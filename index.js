const express = require('express');
const expressStatus = require('express-server-status');
const {decorateApp} = require('@awaitjs/express');
const line = require('@line/bot-sdk');
const config = require('config');

// const redis = require('./connectors/redis');

const app = decorateApp(express());

const eventHandler = require('./controllers');

const lineMiddleware = line.middleware(config.line);

app.use(express.static('./public'));

app.post('/webhook', line.middleware(config.line), (req, res) => {
  Promise.all(req.body.events.map(eventHandler)).then((result) => res.json(result));
});

app.getAsync('/', async(req, res) => {
  return res.json({summerfall: true})
});

// app.getAsync('/test', async(req, res) => {
//   await redis.setAsync('1', '{"wakwaw": true}');
//   const cache = await redis.getAsync('1');
//   return res.send(cache);
// })

app.useAsync('/status', expressStatus(app));

app.listen(config.port)