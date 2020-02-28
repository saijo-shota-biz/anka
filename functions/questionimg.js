const functions = require('firebase-functions')
const admin = require('firebase-admin')
const db = admin.firestore()
const { createCanvas } = require('canvas')

// OGP関連の定数
const OGP_IMG_WIDTH = 1200
const OGP_IMG_HEIGHT = 630

const func = functions.https.onRequest((req, res) => {
  const questionId = req.params[0].split('/')[3]

  res.set('Cache-Control', 'public, max-age=600, s-maxage=600')

  return db.collection('questions').doc(questionId).get().then(snap => {
    if (!snap) {
      res.status(404).end('404 Not Found')
      return null
    }

    return snap.data();
  }).then((question) => {

    var canvas = createCanvas(OGP_IMG_WIDTH, OGP_IMG_HEIGHT);
    var ctx = canvas.getContext('2d');
  
    ctx.font = '30px sans-serif';
    ctx.textAlign = 'center'
    ctx.fillText(question.content, 600, 300);

    return canvas;

  }).then((canvas) => {

    if (canvas) {
      res.writeHead(200, {'Content-Type': 'image/png'})
      canvas.pngStream().pipe(res)
    } else {
      res.status(500).end('500 Server Internal Error')
    }
  }).catch((err) => {
    res.status(500).end('500 Server Internal Error')
  })
})

module.exports = func;