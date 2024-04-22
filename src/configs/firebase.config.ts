import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import ENV from "./env.config";

const firebaseConfig = {
  apiKey: ENV.API_KEY,
  authDomain: ENV.AUTH_DOMAIN,
  projectId: ENV.PROJECT_ID,
  storageBucket: ENV.STORAGE_BUCKET,
  messagingSenderId: ENV.MESSAGING_SENDER_ID,
  appId: ENV.APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firebaseDB = getFirestore(app);

export default firebaseDB;
