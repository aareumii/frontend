// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



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
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();
const auth = getAuth();

//팝업창 로그인 함수 

const signInWithGoogle = () =>{
  return signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(result, user,analytics);

    localStorage.setItem("access_token", token)
    window.alert("회원가입에 성공하였습니다.");
    
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    console.log(errorCode, errorMessage, email, credential);
    window.alert("소셜로그인에 실패. 일반로그인을 해주세요")
  });
}; 

export { signInWithGoogle}