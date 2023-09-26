import { privateApi } from '.';

// 타입스크립트
import { IOUProps } from '../type/iou';

// 차용증 생성
export const postIOU = async (info: IOUProps) => {
    try {
        await privateApi.post('/api/contract', info);
        console.log('차용증 생성', info);
    } catch (error) {
        console.log('postIOU 실패', error);
    }
};

// 차용증 조회
export const getIOU = async () => {
    try {
        // const response = await privateApi.get(`/api/contract/${contractId}`);
        //테스트용
        const response = await privateApi.get('/api/contract/1');
        console.log(response.data);
        console.log('차용증 조회 성공 ');
        return response;
    } catch (error) {
        console.log('getIOU 실패', error);
    }
};
