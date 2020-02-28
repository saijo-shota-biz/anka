const functions = require('firebase-functions')
const admin = require('firebase-admin')
const db = admin.firestore()

const app_domain = 'anka-ddb39.firebaseapp.com'
const OGP_IMG_WIDTH = 1200
const OGP_IMG_HEIGHT = 630

const func = functions.https.onRequest((req, res) => {
  const questionId = req.params[0].split('/')[2]
  return db.collection('questions').doc(questionId).get().then(snap => {
    if (!snap) {
      res.status(404).end('404 Not Found')
      return
    }
    const question = snap ? snap.data() : {}
    const content = question.content || '';
    const html = createHtml(content, questionId)
    res.set('Cache-Control', 'public, max-age=600, s-maxage=600')
    res.status(200).end(html)
    return
  }).catch((err) => {
    console.warn(err)
  })
});

// ************************************************
// アプリ側の更新時にHTMLも修正する(JSの読み込み部分)
// ************************************************
const createHtml = (content, questionId) => {
  const SITEURL = `https://${app_domain}`
  const PAGEURL = `${SITEURL}/question/${questionId}`
  const TITLE = `${content}`
  const DESCRIPTION = 'リアルタイムアンケートを簡単に作成できるサービスです。'
  return `<!DOCTYPE html>
<html lang=ja>
  <head>
    <meta charset=utf-8>
    <meta http-equiv=X-UA-Compatible content="IE=edge">
    <meta name=viewport content="width=device-width,initial-scale=1">
    <meta property="og:title" content="${TITLE}">
    <meta property="og:image" content="${SITEURL}/ogp/questionimg/${questionId}">
    <meta property="og:image:width" content="${OGP_IMG_WIDTH}">
    <meta property="og:image:height" content="${OGP_IMG_HEIGHT}">
    <meta property="og:description" content="${DESCRIPTION}">
    <meta property="og:url" content="${PAGEURL}">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="あんけーと">
    <meta name="twitter:site" content="${SITEURL}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${TITLE}">
    <meta name="twitter:image" content="${SITEURL}/ogp/questionimg/${questionId}">
    <meta name="twitter:description" content="${DESCRIPTION}">
    <link rel=icon href=/favicon.ico>
    <title>あんけーと</title>
    <link rel=stylesheet href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900">
    <link rel=stylesheet href=https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css>

    <link href=/css/chunk-vendors.06ba1b50.css rel=preload as=style>
    <link href=/js/app.a2e93f2f.js rel=preload as=script>
    <link href=/js/chunk-vendors.2bcb2117.js rel=preload as=script>
    <link href=/css/chunk-vendors.06ba1b50.css rel=stylesheet>

  </head>
  <body>
    <noscript></noscript>
    <div id=app></div>

    <script src=/js/chunk-vendors.2bcb2117.js></script>
    <script src=/js/app.a2e93f2f.js></script>

  </body>
</html>
`
}

module.exports = func
