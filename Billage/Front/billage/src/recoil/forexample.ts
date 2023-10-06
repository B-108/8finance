import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist();

// 사용 예시입니다.
export const ForExampleState = atom<number[]>({
  key: 'ForExampleState',
  default: [],
})

// 로컬스토리지에 저장하는 예시입니다.
export const ForExampleState2 = atom<number[]>({
  key: 'ForExampleState2',
  default: [],
  effects_UNSTABLE: [persistAtom], // 이거하나만 추가하면 됨
})

// 이 리코일을 사용할 파일에서는
// const [forexample, setForexample] = useRecoilState(ForExampleState)