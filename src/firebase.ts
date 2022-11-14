import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyCV7lNFV6Ngh-5TJtfqSJtM198l5O90Hbg",
  authDomain: "queuing-6cc52.firebaseapp.com",
  projectId: "queuing-6cc52",
  storageBucket: "queuing-6cc52.appspot.com",
  messagingSenderId: "820320298333",
  appId: "1:820320298333:web:2149bcc1c116bbc0fbb4b4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const storage = getStorage(app);

export { app, auth, db, storage };
