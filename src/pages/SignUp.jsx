import { getAuth, createUserWithEmailAndPassword, Auth, UserCredential } from "firebase/auth";
import React, { useState } from "react";
import weather from "../assets/img/login/weather.png";
import styled from "styled-components";

// Assuming you have a functional component
const RegistrationComponent: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegistration = async () => {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Signed in
      const user = userCredential.user;
      console.log(user)
      // Additional logic if needed...
      window.alert("회원가입이 완료되었습니다.")
      // Clear the form after successful registration
      setEmail("");
      setPassword("");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMsg(errorMessage, errorCode);
    }
  };

  return (
    <Layer>
      <div className="cover-img">
        <img src={weather} alt="signup" height="100%" width="720px" />
      </div>
      
     
      
      <form>
        <div>
        <label>E-Mail:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        
        <div>
        <label>비밀번호:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        
        

        <button type="button" onClick={handleRegistration}>
          회원가입
        </button>
        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      </form>
     
      
    </Layer>
  );
};

const auth: Auth = getAuth();

export default RegistrationComponent;

const Layer = styled.div`
display: flex;




form{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  gap: 20px;
  backgound-color: #7475F7;
  width: 50%;
}
`
