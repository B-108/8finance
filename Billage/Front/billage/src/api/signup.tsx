import { publicApi } from ".";


// 타입스크립트
import { SignUpProps } from "../type/auth";

export const postSignUp = async (user:SignUpProps) => {
  try{
    const response = await publicApi.post("/user/signup", user);
    console.log(response.data);
    return response.data;
  }
  catch (error) {
    console.log("postSignUp을 실패한 이유는??",error)
  }
}