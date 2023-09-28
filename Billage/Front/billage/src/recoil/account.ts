import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

// 이미지
import NH from '/src/assets/NH.svg';
import KB from '/src/assets/KB.svg';
import HANA from '/src/assets/HANA.svg';
import IBK from '/src/assets/IBK.svg';
import SINHAN from '/src/assets/SINHAN.svg';
import URI from '/src/assets/URI.svg';
// import KAKAO from '/src/assets/KAKAO.svg';

// 타입스크립트
import { BankType } from "../type/account";

const { persistAtom } = recoilPersist();

// 주계좌 담는 리코일 쓸지 말지 보류
// export const MainAccountState = atom<string>({
//   key: 'MainAccountState',
//   default: "",
//   effects_UNSTABLE: [persistAtom],
// })

export const BankListState = atom<BankType[]>({
  key: 'BankListState',
  default: [
    {
      logo: NH,
      bankName: '농협은행',
    },
    {
      logo: KB,
      code: "004",
      bankName: '국민은행',
    },
    {
      logo: IBK,
      code: "002",
      bankName: '기업은행',
    },
    {
      logo: HANA,
      bankName: '하나은행',
    },
    {
      logo: SINHAN,
      bankName: '신한은행',
    },
    {
      logo: URI,
      bankName: '우리은행',
    },
    // {
    //   logo: KAKAO,
    //   bankName: '카카오뱅크',
    // },
  ],
})