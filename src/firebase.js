/* eslint-disable import/first */

require("@firebase/polyfill");
const firebase = require("@firebase/app").default;
require("@firebase/firestore");
require("@firebase/auth");

try {
  firebase.initializeApp({
    apiKey: "AIzaSyDaNFx5pmNjGFNj-8jkdMUhuNG3E2QHkb0",
    authDomain: "appliday-fba38.firebaseapp.com",
    databaseURL: "https://appliday-fba38.firebaseio.com",
    projectId: "appliday-fba38",
    storageBucket: "appliday-fba38.appspot.com",
    messagingSenderId: "124815304209",
    appId: "1:124815304209:web:a3848e461d78324e4533b0"
  });
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}

const auth = firebase.auth();
const firestore = firebase.firestore();

export { firebase, auth, firestore };
