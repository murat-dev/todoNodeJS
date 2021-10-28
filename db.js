const firebase = require("firebase");
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

const db = firebase.initializeApp(firebaseConfig);

module.exports = db;
