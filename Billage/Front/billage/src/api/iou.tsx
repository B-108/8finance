import { privateApi } from '.';

// 타입스크립트
import { IOUProps } from '../type/iou';

// 차용증 생성
export const postIOU = async (info: IOUProps) => {
    try {
        const response = await privateApi.post('/api/contract', info);
        console.log('차용증 생성', response.status);
        return response.status;
    } catch (error) {
        // console.log(info);
        console.log('postIOU 실패', error);
    }
};

// 차용증 조회
export const getIOU = async (contractId: number) => {
    try {
        const response = await privateApi.get(`/api/contract/${contractId}`);
        console.log(response.data);
        console.log('차용증 조회 성공 ');
        return response;
    } catch (error) {
        console.log('getIOU 실패', error);
    }
};
