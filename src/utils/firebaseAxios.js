// firebaseAxios.js
import axios from "axios";

const axios = require("axios");

// Firebase Functions의 URL을 baseURL로 설정
const instance = axios.create({
	baseURL: "http://localhost:5001/weather-eottae-a56be/us-central1/createPost", // Firebase Functions의 URL을 여기에 입력
	timeout: 10000 // 타임아웃 설정 (선택 사항)
});

module.exports = instance;
