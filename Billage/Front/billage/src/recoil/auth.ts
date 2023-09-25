import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist();

export const NameState = atom<string>({
  key: 'NameState',
  default: "",
  effects_UNSTABLE: [persistAtom],
})

export const PhoneState = atom<string>({
  key: 'PhoneState',
  default: "",
  effects_UNSTABLE: [persistAtom],
})

export const PinCheckState = atom<string>({
  key: 'PinCheckState',
  default: "",
})

export const PinEnterState = atom<string>({
  key: 'PinEnterState',
  default: "",
})

export const PinRegisterState = atom<string>({
  key: 'PinRegisterState',
  default: "",
})

