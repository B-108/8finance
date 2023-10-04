import { atom } from 'recoil';
import { UserType } from '../type/user';

// Recoil 상태 정의
export const UserState = atom<[UserType]>({
    key: 'UserState',
    default: [
        {
            userPk: 0,
            userCellNO: '',
            userName: '',
        },
    ],
});
