import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist();


// 주계좌 담는 리코일 쓸지 말지 보류
// export const MainAccountState = atom<string>({
//   key: 'MainAccountState',
//   default: "",
//   effects_UNSTABLE: [persistAtom],
// })