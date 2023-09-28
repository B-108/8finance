import { publicApi } from ".";

// 타입스크립트
import { LoginProps, MessageCertProps, MessageProps, SignUpProps } from '../type/auth';

// 회원가입
export const postSignUp = async (info: SignUpProps) => {
  try{
    const response = await publicApi.post("/api/user/signup", info);
    console.log(response.data);
    return response.data;
  }
  catch (error) {
    console.log("postSignUp을 실패한 이유는??",error)
  }
}

// 로그인
export const postLogin = async (info: LoginProps) => {
  try{
    const response = await publicApi.post("/api/user/login", info);
    
    if (response && response.status === 200){
      const accessToken = response.data.jwtToken.accessToken
      const refreshToken = response.data.jwtToken.refreshToken

        if (response && response.status === 200) {
            const accessToken = response.data.jwtToken.accessToken;
            const refreshToken = response.data.jwtToken.refreshToken;

            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('refresh_token', refreshToken);

            return response.data.userName;
        }
    } 
  }
    catch (error) {
      console.log('postLogin을 실패한 이유는??', error);
    }
  }

// 문자 요청
export const postMessage = async (info: MessageProps) => {
  try{
    const response = await publicApi.post("/api/sms", info);
    console.log("회원가입 문자 요청 ",response.data.statusName)
  }
  catch (error) {
    console.log("postMessage를 실패한 이유는??",error)
  }
}

// 문자 인증 요청
export const postMessageCert = async (info: MessageCertProps) => {
  try{
    const response = await publicApi.post("/api/sms/verify", info);
    if (response.status === 200 ) {
      console.log("회원가입 문자 인증 success")
      return response.status
    }
  }
  catch (error) {
    console.log("postMessageCert 실패한 이유는??",error)
  }
}

// 
export const getPhoneCheck = async (phone:string) => {
  try{
    const response = await publicApi.get(`/api/user/${phone}`);
    console.log("회원인지 인증 success")
    return response
  }
  catch (error) {
    console.log("getPhoneCheck 실패한 이유는??",error)
  }
}
