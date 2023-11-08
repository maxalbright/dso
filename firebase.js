
// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC4dM5cCzqXBPZzwXMJvsf-Pcrz99S3Ozg",
    authDomain: "memorylane-cba54.firebaseapp.com",
    projectId: "memorylane-cba54",
    storageBucket: "memorylane-cba54.appspot.com",
    messagingSenderId: "977349991184",
    appId: "1:977349991184:web:a9706f087af4e1a8776395",
    measurementId: "G-MEH9JJD81R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Storage
const storage = getStorage(app);

export { db, storage };
