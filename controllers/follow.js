async function follow(e, lineClient) {
  const {userId} = e.source;
  const {replyToken} = e;

  const {richmenus} = await lineClient.getRichMenuList();

  await lineClient.replyMessage(replyToken, {
    type: 'text',
    text: 'Halo teman, selamat datang di Summerfall, dimana kebahagiaan dimulai! 🎊 🎉🎈🍭'
  })
  if (richmenus.length > 0) {
    // link to default richmenu
    await lineClient.linkRichMenuToUser(userId, richmenus[0].richMenuId);
  }
  await lineClient.replyMessage(replyToken, {
    type: 'text',
    text: 'Silahkan tekan tombol Hadiah untuk mendapatkan hadiah anda 🎁 '
  });
}

module.exports = follow;