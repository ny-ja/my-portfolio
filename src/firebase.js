import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAMAlMEbUYNDUknm29qPeFv-H1xAQdf9q8",
    authDomain: "my-portfolio-d05f1.firebaseapp.com",
    projectId: "my-portfolio-d05f1",
    storageBucket: "my-portfolio-d05f1.firebasestorage.app",
    messagingSenderId: "747886884612",
    appId: "1:747886884612:web:f815496804babb19d4c251"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
