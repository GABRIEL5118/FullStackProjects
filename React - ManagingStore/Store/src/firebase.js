import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAaNutOX_DcVBUUEvHzA0fr8HvWVEYCRi0",
  authDomain: "managestore-3be04.firebaseapp.com",
  projectId: "managestore-3be04",
  storageBucket: "managestore-3be04.firebasestorage.app",
  messagingSenderId: "832989011474",
  appId: "1:832989011474:web:7cb3f45db8fad47d9ac2cb",
  measurementId: "G-YQV8HR41E0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db, analytics };
