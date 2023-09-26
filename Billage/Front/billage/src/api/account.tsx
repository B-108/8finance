import { privateApi } from ".";

// 타입스크립트
import { AccountProps } from "../type/account";
import { 
  MessageCertProps, 
  MessageProps } from "../type/auth";

// 계좌 등록
export const postAccountRegister = async (info: AccountProps) => {
  try{
    await privateApi.post("/api/account",info)
    console.log("계좌 등록 성공 ")
  }
  catch (error){
    console.log("postAccountList 실패",error)
  }
}

// 전체 계좌 조회
export const getAccountList = async () => {
  try{
    const response = await privateApi.get("/api/account")
    console.log("계좌 조회 성공 ")
    return response
  }
  catch (error){
    console.log("getAccountList 실패",error)
  }
}

// 주계좌 등록
export const patchMainAccount = async (accountId:number) => {
  try{
    const response = await privateApi.patch(`/api/account/${accountId}`)
    console.log("주계좌 등록 성공 ")
    return response
  }
  catch (error){
    console.log("getAccountList 실패",error)
  }
}


// 문자 요청
export const postMyDataMessage = async (info: MessageProps) => {
  try{
    const response = await privateApi.post("/api/sms/myData", info);
    console.log("마이데이터 문자 요청 ",response.data.statusName)
  }
  catch (error) {
    console.log("postMyDataMessage를 실패한 이유는??",error)
  }
}

// 문자 인증 요청
export const postMyDataMessageCert = async (info: MessageCertProps) => {
  try{
    const response = await privateApi.post("/api/sms/myData/verify", info);
    if (response.status === 200 ) {
      console.log("마이데이터 문자 인증 success")
      return response.status
    }
  }
  catch (error) {
    console.log("postMyDataMessageCert을 실패한 이유는??",error)
  }
}