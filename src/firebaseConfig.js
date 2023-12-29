import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyA-eRwi6AEHf3qw0aUcCo6A2b1gZTqVi2o",
	authDomain: "weather-eottae-49fe1.firebaseapp.com",
	projectId: "weather-eottae-49fe1",
	storageBucket: "weather-eottae-49fe1.appspot.com",
	messagingSenderId: "890779799053",
	appId: "1:890779799053:web:58f1bf38e9814cb68a4f44"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export {app, db, storage};
