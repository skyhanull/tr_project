// components/KakaoShareButton.js
import { useEffect } from "react";
import { FaShareNodes } from "react-icons/fa6";

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
}

interface Window {
  Kakao: any;
}

const KakaoShareButton = ({
  title,
  description,
  imageUrl,
  linkUrl,
}: CardProps) => {
  const KAKAO_CLIENT_KEY = process.env.NEXT_PUBLIC_JS_KAKAO_CLIENT_KEY;
  useEffect(() => {
    // 카카오 SDK가 이미 로드되었는지 확인
    if (window.Kakao && !window.Kakao.isInitialized() && KAKAO_CLIENT_KEY) {
      // 카카오 SDK 초기화
      window.Kakao.init(KAKAO_CLIENT_KEY);
    }
  }, []);

  const shareKakao = () => {
    if (window.kakao) {
      window.kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: title,
          description: description,
          imageUrl: imageUrl,
          link: {
            mobileWebUrl: linkUrl,
            webUrl: linkUrl,
          },
        },
      });
    }
  };

  return (
    <button onClick={shareKakao}>
      <FaShareNodes size={30} />
    </button>
  );
};

export default KakaoShareButton;
