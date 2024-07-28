/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // 모든 도메인에서 요청을 허용
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  images: {
    domains: [
      "t1.daumcdn.net",
      "t1.kakaocdn.net",
      "dbscthumb-phinf.pstatic.net",
      "search.pstatic.net",
      "example.com",
      "images.unsplash.com",
      "plus.unsplash.com",
    ], // 외부 이미지 도메인 허용
  },
};

export default nextConfig;
