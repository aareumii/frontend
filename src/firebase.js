// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyD0KUkvUgzXN_06QmzIJw0RHvn1Op5iDV0",
	authDomain: "weather-eottae-a56be.firebaseapp.com",
	projectId: "weather-eottae-a56be",
	storageBucket: "weather-eottae-a56be.appspot.com",
	messagingSenderId: "1046771817065",
	appId: "1:1046771817065:web:e1ca94b68c748976d560f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
