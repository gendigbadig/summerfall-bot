const {adminCheck, updateStatus} = require('./auth');
const config = require('config');

async function activateAdmin(e, lineClient) {
  await updateStatus(e, 'isAdmin', true);
  await lineClient.replyMessage(e.replyToken, {
    type: 'text',
    text: `Anda telah masuk ke mode admin. Anda dapat melakukan command-command admin, seperti: 

- admin list user
# list semua user yang menggunakan bot ini

- admin status [me|userId]
# ambil status user (mode/reply/stage)

- admin reply [userId]
# pindah ke mode balas pesan ke user id yang ditentukan 

- admin reply end
# keluar dari mode balas pesan

- admin retreive start
# mulai menerima semua pesan dari semua user ke bot

- admin retrieve end
# berhenti menerima semua pesan dari semua user ke bot

- admin pass end
# keluar dari mode admin
`
  });
}

async function deactivateAdmin(e, lineClient) {
  await updateStatus(e, 'isAdmin', false);
  await lineClient.replyMessage(e.replyToken, {
    type: 'text',
    text: 'Anda telah keluar dari mode admin'
  })
}

async function admin(e, lineClient) {
  const {text: messageText} = e.message;
  const messages = messageText.split(' ');
  const isAdmin = adminCheck(e.source);
  if (messages.length < 3) {
    return
  }
  if (messages[1] === 'pass') {
    if (messages[2] === config.admin.passKey) {
      return activateAdmin(e, lineClient)
    }
    if (messages[2] === 'end') {
      return deactivateAdmin(e, lineClient)
    }
  }

}

module.exports = admin;