import { Dispatch } from "redux";
import { loginSuccess } from "../slice/AuthSlice";
import axios, { AxiosResponse } from "axios";

// 액션의 타입 및 페이로드 타입을 실제 타입으로 바꿔주세요
interface AuthAction {
  type: string;
  payload?: string;
}

// 응답 헤더의 기대 형태를 정의합니다.
interface MyResponseHeaders {
  authorization_access_token?: string;
  authorization_refresh_token?: string;
}

export function authActionCreator(userId: string, password: string) {
  return async function authThunk(dispatch: Dispatch<AuthAction>) {
    try {
      const response: AxiosResponse<MyResponseHeaders> = await axios.post("http://43.200.188.52:8080/login", {
        email: userId,
        password: password,
      });

      const accessToken = response.headers["authorization_access_token"];
      const refreshToken = response.headers["authorization_refresh_token"];

      dispatch(loginSuccess({ accessToken, refreshToken }));

      if (accessToken && refreshToken) {
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        console.log("로그인 성공");
      } else {
        console.log("토큰이 없습니다.");
      }
    } catch (error) {
      console.error("서버와 통신실패:", error);
    }
  };
}

