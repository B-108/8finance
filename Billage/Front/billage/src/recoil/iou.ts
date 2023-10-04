import { atom, useRecoilState } from 'recoil';

// Recoil 상태 정의
export const ContractState = atom({
    key: 'ContractState',
    default: {
        creditorUser: {
            userName: '',
        }, // 채권자
        debtorUser: {
            userName: '',
        }, // 채무자
        contractDebtorAcNum: '', // 돈을 빌리는 사람이 돈을 받을 계좌(은행)
        contractStartDate: '', // 계약 시작 날짜 (거래상태가 진행중으로 바뀔 때 업데이트)
        contractMaturityDate: '', // 돈 갚을 날짜
        contractAmt: 0, // 빌릴 금액
        contractInterestRate: 0, // 이자율
    },
});

// IOUCheck페이지에서 생성요청 보낼 차용증
export const IOUState = atom({
    key: 'IOUState',
    default: {},
});

// IOUCheck페이지에서 임시로 보여줄 차용증
export const IOUCheckState = atom({
    key: 'IOUCheckState',
    default: {},
});

// 컴포넌트에서 Recoil 상태를 사용하기 위한 훅
export function useIOUState() {
    return useRecoilState(IOUState);
}
export function useIOUCheckState() {
    return useRecoilState(IOUCheckState);
}
