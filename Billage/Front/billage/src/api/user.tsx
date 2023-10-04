import { privateApi } from '.';

// 유저 조회
export const getUser = async (userName: string) => {
    try {
        const response = await privateApi.get(`/api/user/${userName}/userList`);
        console.log('유저 조회 성공 ');
        return response;
    } catch (error) {
        console.log('getUserList 실패', error);
    }
};
