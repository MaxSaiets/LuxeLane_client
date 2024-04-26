import { initializeApp } from "firebase/app";
import { getAuth, onIdTokenChanged, getIdToken } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
onIdTokenChanged(auth, function(user) {
  if (user) {
    getIdToken(user, true);
  }
});

export const fireBaseStorage = getStorage(app);