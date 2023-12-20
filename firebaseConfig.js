import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {
	getAuth,
	signInWithEmailAndPassword,
	onAuthStateChanged
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyA-eRwi6AEHf3qw0aUcCo6A2b1gZTqVi2o",
	authDomain: "weather-eottae-49fe1.firebaseapp.com",
	projectId: "weather-eottae-49fe1",
	storageBucket: "weather-eottae-49fe1.appspot.com",
	messagingSenderId: "890779799053",
	appId: "1:890779799053:web:58f1bf38e9814cb68a4f44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

export {app, auth, db};
