// components/KakaoShareButton.tsx
import { useEffect } from "react";
import { IoMdShare } from "@react-icons/all-files/io/IoMdShare";
interface CardProps {
  title: string;
  description: any;
  imageUrl: string;
  linkUrl: string;
  startDate: string; // "YYYYMMDD" 형식
}

const KakaoShareButton = ({
  title,
  description,
  imageUrl,
  linkUrl,
  startDate,
}: CardProps) => {
  const KAKAO_CLIENT_KEY = process.env.NEXT_PUBLIC_JS_KAKAO_CLIENT_KEY;

  useEffect(() => {
    if (typeof window !== "undefined" && window.Kakao) {
      if (!window.Kakao.isInitialized() && KAKAO_CLIENT_KEY) {
        window.Kakao.init(KAKAO_CLIENT_KEY);
      }
    }
  }, [KAKAO_CLIENT_KEY]);

  const shareKakao = () => {
    if (typeof window !== "undefined" && window.Kakao) {
      // 피드 메시지 전송
      window.Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: `${startDate} 일정`,
          description: description,
          imageUrl: imageUrl,
          link: {
            mobileWebUrl: linkUrl,
            webUrl: linkUrl,
          },
        },
        buttons: [
          {
            title: "자세히 보기",
            link: {
              mobileWebUrl: linkUrl,
              webUrl: linkUrl,
            },
          },
          {
            title: "자세히 보기",
            link: {
              mobileWebUrl: linkUrl,
              webUrl: linkUrl,
            },
          },
        ],
        // success: () => {
        //   // 피드 메시지 전송 성공 후 캘린더 메시지 전송
        //   if (window.Kakao) {
        //     window.Kakao.Link.sendDefault({
        //       objectType: "calendar",
        //       headerLink: {
        //         mobileWebUrl: linkUrl,
        //         webUrl: linkUrl,
        //       },
        //       content: {
        //         title: title,
        //         description: description,
        //         imageUrl: imageUrl,
        //         link: {
        //           mobileWebUrl: linkUrl,
        //           webUrl: linkUrl,
        //         },
        //       },
        //       schedule: {
        //         startTime: startDate,
        //         endTime: endDate,
        //       },
        //       buttons: [
        //         {
        //           title: "자세히 보기",
        //           link: {
        //             mobileWebUrl: linkUrl,
        //             webUrl: linkUrl,
        //           },
        //         },
        //       ],
        //     });
        //   }
        // },
        fail: (error: any) => {
          console.error("피드 메시지 전송 실패:", error);
        },
      });
    } else {
      console.error("Kakao SDK가 초기화되지 않았습니다.");
    }
  };

  return (
    <button
      onClick={shareKakao}
      className="flex items-center bg-rose-200 w-full justify-center p-3 mx-2 rounded-xl"
    >
      <IoMdShare size={25} />
      <span className="text-lg ml-1"> 카카오톡으로 공유하기</span>
    </button>
  );
};

export default KakaoShareButton;
