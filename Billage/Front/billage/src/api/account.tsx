import {AxiosResponse} from "axios";
import { privateApi } from ".";

// 타입스크립트
import { AccountProps } from "../type/account";

export const postAccountRegister = async (info: AccountProps) => {
  try{
    await privateApi.post("/account",info)
    console.log("계좌 등록 성공 ")
  }
  catch (error){
    console.log("postAccountList 실패",error)
  }
}

export const getAccountList = async () => {
  try{
    const response = await privateApi.get("/account")
    console.log("계좌 조회 성공 ")
    return response
  }
  catch (error){
    console.log("getAccountList 실패",error)
  }
}