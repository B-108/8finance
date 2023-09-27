import { privateApi } from ".";

// 타입스크립트
// import { Transaction } from "../type/transaction";

//빌린 거래 조회
export const getBorrowList = async () => {
    try{
        const response = await privateApi.get("/api/loan/borrow")
        console.log("빌린 거래 목록 조회 성공")
        return response
    }
    catch(error){
        console.log('getBorrowList 실패', error)
    }
}

//빌려준 거래 조회
export const getLendList = async () => {
    try{
        const response = await privateApi.get("/api/loan/lend")
        console.log("빌려준 거래 목록 조회 성공")
        return response
    }
    catch(error){
        console.log('getLendList 실패', error)
    }
}

//거래 상세 조회
export const getTransActionDetail = async (contractId : number) => {
    try{
        const response = await privateApi.get(`/api/loan/${contractId}/detail`)
        console.log("거래 상세 조회 성공")
        return response
    }
    catch(error){
        console.log('getTransActionDetail 실패', error)
    }
}

//거래 내역 상세 조회
export const getTransActionHistory = async (contractId : number) => {
    try{
        const response = await privateApi.get(`/api/loan/${contractId}/trinfo`)
        console.log("거래 내역 상세 조회 성공")
        return response
    }
    catch(error){
        console.log('getTransActionHistory 실패', error)
    }
}

