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
  kakao: any;
}

const KakaoShareButton = ({
  title,
  description,
  imageUrl,
  linkUrl,
}: CardProps) => {
  useEffect(() => {
    if (!window.kakao.isInitialized()) {
      window.kakao.init(process.env.NEXT_PUBLIC_JS_KAKAO_CLIENT_KEY); // 자신의 카카오 앱 키로 초기화
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
