import { publicApi } from ".";


// 타입스크립트
import { 
  LoginProps, 
  SignUpProps } from "../type/auth";

// 회원가입
export const postSignUp = async (user: SignUpProps) => {
  try{
    const response = await publicApi.post("/user/signup", user);
    console.log(response.data);
    return response.data;
  }
  catch (error) {
    console.log("postSignUp을 실패한 이유는??",error)
  }
}

// 로그인
export const postLogin = async (user: LoginProps) => {
  try{
    const response = await publicApi.post("/user/login", user);
    
    if (response && response.status === 200){
      const accessToken = response.headers["jwtToken"]["accessToken"]
      const refreshToken = response.headers["jwtToken"]["refreshToken"]

      console.log("access 토큰 :", accessToken);
      console.log("refresh 토큰 :", refreshToken);

      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
    }
  }
  catch (error) {
    console.log("postLogin을 실패한 이유는??",error)
  }
}