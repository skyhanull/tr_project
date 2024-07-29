interface KakaoLink {
  sendDefault(params: any): void;
}

interface Kakao {
  init(appKey: string): void;
  isInitialized(): boolean;
  Link: KakaoLink;
  // 필요한 다른 Kakao API 메서드를 추가할 수 있습니다.
}

interface Window {
  Kakao?: Kakao;
}
