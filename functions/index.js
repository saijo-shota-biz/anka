const functions = require('firebase-functions')
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://anka-ddb39.firebaseio.com"
});

const funcImg = require('./questionimg.js');
const funcPage = require('./questionpage.js');

exports.questionimg = funcImg;
exports.questionpage = funcPage;
