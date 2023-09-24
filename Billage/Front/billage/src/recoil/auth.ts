import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist();

export const NameState = atom<string>({
  key: 'NameState',
  default: "",
})

export const PhoneState = atom<string>({
  key: 'PhoneState',
  default: "",
})

export const PinNumberState = atom<string>({
  key: 'PinNumberState',
  default: "",
})

export const PinNumberCheckState = atom<string>({
  key: 'PinNumberCheckState',
  default: "",
})