const config = require('config');

const auth = require('./auth');

const BASE_URL = config.baseUrl;

async function sendMessage(replyToken, lineClient, message) {
  return lineClient.replyMessage(replyToken, {
    type: 'text',
    text: message
  })
}

async function pushMessage(userId, lineClient, message) {
  return lineClient.pushMessage(userId, {
    type: 'text',
    text: message
  })
}

async function pushMessageBulk(userId, lineClient, messages) {
  return lineClient.pushMessage(userId, messages.map(message => ({type: 'text', text: message})));
}

async function pushCarousel(userId, lineClient, carouselItems) {
  return lineClient.pushMessage(userId, {
    type: 'template',
    altText: 'summerfall-carousel',
    template: {
      type: 'carousel',
      columns: carouselItems,
      imageAspectRatio: 'rectangle',
      imageSize: 'cover'
    }
  })
}

async function pushSound(userId, lineClient, url, duration) {
  return lineClient.pushMessage(userId, {
    type: 'audio',
    originalContentUrl: url,
    duration
  })
}

async function pushVideo(userId, lineClient, url, previewUrl) {
  return lineClient.pushMessage(userId, {
    type: 'video',
    originalContentUrl: url,
    previewImageUrl: previewUrl
  })
}

async function pushImage(userId, lineClient, url, previewUrl) {
  return lineClient.pushMessage(userId, {
    type: 'image',
    originalContentUrl: url,
    previewImageUrl: previewUrl
  })
}

async function pushSticker(userId, lineClient, packageId, stickerId) {
  return lineClient.pushMessage(userId, {
    type: 'sticker',
    packageId,
    stickerId
  })
}

function generateCarousel() {
  const items = [
    {
      thumbnailImageUrl: `${BASE_URL}assets/carousel/hadiah-a.png`,
      imageBackgroundColor: '#ff7979',
      title: 'Hadiah A',
      text: 'Tap untuk mendapatkan hadiah A',
      actions: [
        {
          type: 'message',
          text: 'HADIAH A',
          label: 'Tap'
        }
      ]
    }, {
      thumbnailImageUrl: `${BASE_URL}assets/carousel/hadiah-y.png`,
      imageBackgroundColor: '#7ed6df',
      title: 'Hadiah Y',
      text: 'Tap untuk mendapatkan hadiah Y',
      actions: [
        {
          type: 'message',
          text: 'HADIAH Y',
          label: 'Tap'
        }
      ]
    }, {
      thumbnailImageUrl: `${BASE_URL}assets/carousel/hadiah-n.png`,
      imageBackgroundColor: '#f0932b',
      title: 'Hadiah N',
      text: 'Tap untuk mendapatkan hadiah N',
      actions: [
        {
          type: 'message',
          text: 'HADIAH N',
          label: 'Tap'
        }
      ]
    }, {
      thumbnailImageUrl: `${BASE_URL}assets/carousel/hadiah-i.png`,
      imageBackgroundColor: '#f6e58d',
      title: 'Hadiah I',
      text: 'Tap untuk mendapatkan hadiah I',
      actions: [
        {
          type: 'uri',
          uri: 'https://wa.me/6289666555159/?text=bang%20aku%20ultah%20nih%20pengen%20hadiah%20pizza%20dong%20nanti%20aku%20kirimin%20alamatnyaa%2C%20tapi%20beneran%20dikasih%20yaa%20pizzanyaa%20haha%20%3Ap',
          label: 'Tap'
        }
      ]
    }
  ]
  return items;
}

async function hadiahA(e, lineClient) {
  const userId = e.source.userId;
  await sendMessage(e.replyToken, lineClient, 'INILAAAH HADIAH A');
  await pushImage(userId, lineClient, `${BASE_URL}assets/image/hadiah-a-besar.jpg`, `${BASE_URL}assets/image/hadiah-a-besar-preview.jpg`);
  await pushMessage(userId, lineClient, 'Selamat ulang taun yaa soulmatekuh');
}

async function hadiahY(e, lineClient) {
  const userId = e.source.userId;
  await sendMessage(e.replyToken, lineClient, 'INILAAAH HADIAH Y');
  await pushSound(userId, lineClient, `${BASE_URL}assets/audio/hadiah-y.m4a`, 13000);
  await pushMessage(userId, lineClient, 'Happy birthday my best, happy for u my friend, make a wish and we will give u a kiss 😘');
}

async function hadiahN(e, lineClient) {
  const userId = e.source.userId;
  await sendMessage(e.replyToken, lineClient, 'INILAAAH HADIAH N');
  await pushVideo(userId, lineClient, `${BASE_URL}assets/video/hadiah-n.mp4`, `${BASE_URL}assets/video/hadiah-n-preview.jpg`);
  await pushMessage(userId, lineClient, 'Tut tuuut ~ tut tuuuut ~');
}

async function mainPresent(e, lineClient) {
  const replyToken = e.replyToken;
  const userId = e.source.userId;

  await auth.updateStatus(e, 'isHasFirstPresent', true);
  await sendMessage(replyToken, lineClient, 'SIAPP SIAPPP');
  await pushMessage(userId, lineClient, '3 ...');
  await pushMessage(userId, lineClient, '2 ...');
  await pushMessage(userId, lineClient, '1 ...');
  await pushMessage(userId, lineClient, 'INILAH HADIAHNYAA');
  await pushMessage(userId, lineClient, '🎊 SELAMAT ULANG TAUN QURROTU AYNIYYYY!! 🎉');
  await pushMessage(userId, lineClient, '🎈 Happy 19th birthday yaa 🎂 🎁 ');
  await pushMessage(userId, lineClient, 'Semoga selalu sehat, panjang dan berkah umurnya, semangat kuliahnya, semangat ngejar cita citanya, sayang sama orang tua keluarga, sayang sama vira mami dan teman temanmu yang lain, dan semoga yang disemogakan selama ini bisa terwujud semua, aamiiinn 😇');
  await pushMessage(userId, lineClient, 'Oh iyaa dibawah ini ada beberapa kado yang bisa kamu pilih looh, mau pilih satu atau semua juga boleeh, klik aja langsung kadonyaa 🎁 🎁');
  // await pushMessageBulk(userId, lineClient, ['SIAPP SIAPPP', '3 ...', '2 ...', '1 ...', 'INILAH HADIAHNYAA']);
  // await pushMessageBulk(userId, lineClient, ['🎊 SELAMAT ULANG TAUN QURROTU AYNIYYYY!! 🎉', '🎈 Happy 19th birthday yaa 🎂 🎁 ', 'Semoga selalu sehat, panjang dan berkah umurnya, semangat kuliahnya, semangat ngejar cita citanya, sayang sama orang tua keluarga, sayang sama vira mami dan teman temanmu yang lain, dan semoga yang disemogakan selama ini bisa terwujud semua, aamiiinn 😇', 'Oh iyaa dibawah ini ada beberapa kado yang bisa kamu pilih looh, mau pilih satu atau semua juga boleeh, klik aja langsung kadonyaa 🎁 🎁'])
  await pushCarousel(userId, lineClient, generateCarousel());
}

module.exports = async function message(e, lineClient) {
  const userId = e.source.userId;
  const text = e.message.text;

  const userStatus = await auth.getStatus(e);
  const isHasFirstPresent = userStatus.isHasFirstPresent;

  if (/^(mau hadiah)/i.test(text)) {
    if (isHasFirstPresent) {
      return pushCarousel(userId, lineClient, generateCarousel());
    }
    return mainPresent(e, lineClient).catch(e => console.log(e));
  }

  if (/^(hadiah a)/i.test(text)) {
    return hadiahA(e, lineClient);
  }

  if (/^(hadiah y)/i.test(text)) {
    return hadiahY(e, lineClient);
  }

  if (/^(hadiah n)/i.test(text)) {
    return hadiahN(e, lineClient);
  }

  return Promise.resolve(null);
}