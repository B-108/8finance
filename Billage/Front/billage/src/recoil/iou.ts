import { atom } from 'recoil';

// Recoil 상태 정의
export const contractState = atom({
    key: 'contractState',
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
