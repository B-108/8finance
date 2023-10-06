import { privateApi } from "."

// 알림 목록 가져오기
export const getNotifiCation = async () => {
  try{
      const response = await privateApi.get("/api/notice")
      console.log("알림목록 조회성공")
      return response
  }
  catch(error){
      console.log('getNotifiCation 실패', error)
  }
}

// 알림 확인하기
export const patchNotifiCation = async (info:number) => {
  try{
      const response = await privateApi.patch(`/api/notice/${info}`)
      console.log("알림확인 성공")
      return response
  }
  catch(error){
      console.log('patchNotifiCation 실패', error)
  }
}