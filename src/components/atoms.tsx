import { atom } from "recoil";

export const textState = atom({
  key: "textState", // 고유한 key 값을 설정하세요
  default: [], // 기본값
});
