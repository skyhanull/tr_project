# Pide

![Group 11](https://github.com/user-attachments/assets/990a2521-cfb9-4785-a66f-3b61c8e0d489)

배포주소 :[바로가기](https://pide-p.vercel.app/)

## 📕 프로젝트 소개

지역 기반 맛집/관광지 추천 및 길 찾기 웹 애플리케이션

## 🕛 개발 기간

2024.06 ~ 진행 중

## 🕛 테스트 용 계정

id :
password :

## ✍ 실행 방법

---

```sh
git clone // this repository
cd this file location
yarn install
yarn dev
```

## 개발 스택

<p>
<img alt="Next.js" src="https://img.shields.io/badge/Next.js-v13.4.4-000000?style=plastic&logo=next.js&logoColor=white"/>
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-v4.9.4-3178C6?style=plastic&logo=typescript&logoColor=white"/>
<img alt="Tailwind CSS" src="https://img.shields.io/badge/TailwindCSS-v3.2.4-06B6D4?style=plastic&logo=tailwindcss&logoColor=white"/>
<img alt="Axios" src="https://img.shields.io/badge/Axios-v1.3.0-5A29E4?style=plastic&logo=axios&logoColor=white"/>
<img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-v6.0.3-47A248?style=plastic&logo=mongodb&logoColor=white"/>

</p>

## 🗂️ 프로젝트 구조

```
📦src
 ┣ 📂app
 ┃ ┣ 📂about
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂login
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂map
 ┃ ┃ ┣ 📂[local]
 ┃ ┃ ┃ ┣ 📜directionList.tsx
 ┃ ┃ ┃ ┣ 📜locationList.tsx
 ┃ ┃ ┃ ┣ 📜mapCilent.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂mypage
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂share
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📜globals.css
 ┃ ┣ 📜layout.tsx
 ┃ ┣ 📜page.tsx
 ┃ ┗ 📜theme.tsx
 ┣ 📂components
 ┃ ┣ 📂Card
 ┃ ┃ ┣ 📜card.tsx
 ┃ ┃ ┗ 📜caresel.tsx
 ┃ ┣ 📂Modal
 ┃ ┃ ┣ 📜ImgSelectModal.tsx
 ┃ ┃ ┣ 📜detailModal.tsx
 ┃ ┃ ┣ 📜directionModal.tsx
 ┃ ┃ ┣ 📜listModal.tsx
 ┃ ┃ ┣ 📜shareModal.tsx
 ┃ ┃ ┗ 📜storeModal.tsx
 ┃ ┣ 📂Popup
 ┃ ┃ ┗ 📜localPopup.tsx
 ┃ ┣ 📂alert
 ┃ ┣ 📂button
 ┃ ┃ ┗ 📜submitButton.tsx
 ┃ ┣ 📂filterbar
 ┃ ┃ ┣ 📜fieldSelect.tsx
 ┃ ┃ ┣ 📜radioButton.tsx
 ┃ ┃ ┣ 📜search.tsx
 ┃ ┃ ┣ 📜select.tsx
 ┃ ┃ ┗ 📜textInput.tsx
 ┃ ┣ 📂img
 ┃ ┃ ┣ 📜avata.tsx
 ┃ ┃ ┗ 📜mainListImg.tsx
 ┃ ┣ 📂kakao
 ┃ ┃ ┣ 📜kakaomap.tsx
 ┃ ┃ ┗ 📜shareKakao.tsx
 ┃ ┣ 📂layout
 ┃ ┃ ┣ 📜footer.tsx
 ┃ ┃ ┣ 📜header.tsx
 ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┣ 📜loader.tsx
 ┃ ┃ ┗ 📜nav.tsx
 ┃ ┣ 📂list
 ┃ ┃ ┣ 📜locationList.tsx
 ┃ ┃ ┗ 📜mainList.tsx
 ┃ ┣ 📜SearchSuggestions.tsx
 ┃ ┣ 📜busTag.tsx
 ┃ ┣ 📜geocoding.tsx
 ┃ ┣ 📜googleMap.tsx
 ┃ ┣ 📜googletrans.tsx
 ┃ ┣ 📜map.tsx
 ┃ ┗ 📜subwayTag.tsx
 ┣ 📂constants
 ┃ ┣ 📜listFilter.tsx
 ┃ ┗ 📜traffic.tsx
 ┣ 📂hook
 ┃ ┣ 📜storeListHandler.tsx
 ┃ ┣ 📜useDebounce.tsx
 ┃ ┣ 📜useFile.tsx
 ┃ ┗ 📜usePlaces.tsx
 ┣ 📂lib
 ┃ ┣ 📜auth.tsx
 ┃ ┣ 📜mongodb.tsx
 ┃ ┣ 📜next-auth.tsx
 ┃ ┣ 📜recoilWapper.tsx
 ┃ ┗ 📜userRoad.tsx
 ┣ 📂models
 ┃ ┣ 📜MapItem.tsx
 ┃ ┣ 📜User.tsx
 ┃ ┣ 📜regionModels.tsx
 ┃ ┗ 📜userRoad.tsx
 ┣ 📂pages
 ┃ ┗ 📂api
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┗ 📜[...nextauth].tsx
 ┃ ┃ ┣ 📂card
 ┃ ┃ ┃ ┣ 📜delete.tsx
 ┃ ┃ ┃ ┗ 📜post.tsx
 ┃ ┃ ┣ 📂comment
 ┃ ┃ ┃ ┣ 📜[id].tsx
 ┃ ┃ ┃ ┣ 📜delete.tsx
 ┃ ┃ ┃ ┣ 📜post.tsx
 ┃ ┃ ┃ ┗ 📜update.tsx
 ┃ ┃ ┣ 📜dir.tsx
 ┃ ┃ ┣ 📜directions.tsx
 ┃ ┃ ┣ 📜http.tsx
 ┃ ┃ ┣ 📜likepost.tsx
 ┃ ┃ ┣ 📜mapArray.tsx
 ┃ ┃ ┣ 📜mapbox.tsx
 ┃ ┃ ┣ 📜mypost.tsx
 ┃ ┃ ┣ 📜naverSearch.tsx
 ┃ ┃ ┣ 📜regionList.tsx
 ┃ ┃ ┣ 📜regions.tsx
 ┃ ┃ ┣ 📜scrapePlace.tsx
 ┃ ┃ ┣ 📜socket.tsx
 ┃ ┃ ┗ 📜upload.tsx
 ┣ 📂recoil
 ┃ ┗ 📜atoms.tsx
 ┗ 📂utility
 ┃ ┣ 📂interface
 ┃ ┃ ┣ 📜card.tsx
 ┃ ┃ ┣ 📜kakao.tsx
 ┃ ┃ ┣ 📜listInterface.tsx
 ┃ ┃ ┣ 📜next-auth.d.tsx
 ┃ ┃ ┣ 📜pagenation.tsx
 ┃ ┃ ┣ 📜roadType.tsx
 ┃ ┃ ┣ 📜scrapingType.tsx
 ┃ ┃ ┗ 📜urlLink.tsx
 ┃ ┣ 📜color.tsx
 ┃ ┣ 📜distance.tsx
 ┃ ┣ 📜image.tsx
 ┃ ┣ 📜kakao.tsx
 ┃ ┣ 📜puppeteerUtils.tsx
 ┃ ┗ 📜time.tsx
```

## 현재 구현 한 기능

1. 연관 검색창

```
1. 검색한 글자에 따라 입력글자가 포함된 단어들이 검색창네 나타나게 하고 자동완성 시킴
2. 디바운스로 0.2초 마다 한번씩 이벤트가 일어나도록 구현
```

2. 주변 장소 검색 / 리스트

```
1. 사용자가 선택한 지역의 주변 맛집, 관광지, 카페 정보를 카카오 맵의 `keywordSearch` API를 활용하여 가져옴
2. 장소 추가 선택 시 선택한 순서에 따라 마커가 생성 마커는 최대5개까지 생성가능
3. 초기에는 웹 스크래핑을 시도하였으나, 법률 위반의 우려로 인해 Iframe을 활용하여 카카오맵의 가게 페이지를 정보를 보여주는 것으로 변경
4. react-icon사용 시 500KB가 초과하여 @react-icons/all-files로 각각 import하여 크기 개선  및 next-img의 layout이 구식이라 정확한 크기를 지정해주는 방식으로 변경
```

3. mapbox을 이용한 길 찾기

```

1. Mapbox를 사용하여 자동차 / 도보 등 다양한 경로 유형을 지원. 이를 통해 카카오 및 네이버의 방향 API가 제공하지 않는 길 찾기 기능을 구현하고 경로 계산 후 총시간 및 총거리를 제공
2. 로그인한 사용자가 생성한 경로를 마이페이지에 저장하고, 카카오톡으로 공유할 수 있는 기능을 구현
```

3. mapbox을 이용한 길 찾기

```

1. Mapbox를 사용하여 자동차 / 도보 등 다양한 경로 유형을 지원. 이를 통해 카카오 및 네이버의 방향 API가 제공하지 않는 길 찾기 기능을 구현하고 경로 계산 후 총시간 및 총거리를 제공
2. 로그인한 사용자가 생성한 경로를 마이페이지에 저장하고, 카카오톡으로 공유할 수 있는 기능을 구현
```

3. mapbox을 이용한 길 찾기

```

1. Mapbox를 사용하여 자동차 / 도보 등 다양한 경로 유형을 지원. 이를 통해 카카오 및 네이버의 방향 API가 제공하지 않는 길 찾기 기능을 구현하고 경로 계산 후 총시간 및 총거리를 제공
2. 로그인한 사용자가 생성한 경로를 마이페이지에 저장하고, 카카오톡으로 공유할 수 있는 기능을 구현
```

3. mapbox을 이용한 길 찾기

```

1. Mapbox를 사용하여 자동차 / 도보 등 다양한 경로 유형을 지원. 이를 통해 카카오 및 네이버의 방향 API가 제공하지 않는 길 찾기 기능을 구현하고 경로 계산 후 총시간 및 총거리를 제공
2. 로그인한 사용자가 생성한 경로를 마이페이지에 저장하고, 카카오톡으로 공유할 수 있는 기능을 구현
```

## 이슈

1. 지도 선택

```
1. 처음에는 네이버 지도를 선택 => 주변 장소를 최대5개까지 밖에 불러오지 못함
2. 구글 지도 => 길찾기 시 기본이 미국으로 되어있어 한국으로 설정 시 정보가 없다고 나옴 ( 구글에 문의 시 서드파티를 사용하라는 답변) => mapbox를 이용
3. 카카오 지도가 스크래핑이 좋았으나 정책위반으로 페이지를 불러오는 형식으로 변경하여 선택
kakao.maps.LatLng is not a constructor라는 오류가 발생했는데 이것은 script가 완전히 로드 되기 전에 map 관련 메소드를 실행 시키려고 하기 때문에 생기는 에러=>  autoload=false을 넣어줌으로 써 해결
```

2. git action 배포

```
https://nextjs.org/docs/messages/prerender-error TypeError [ERR_INVALID_URL]
오류 발생 => 깃 액션을 사용할 때 프로덕트 next-auth 사용 시 NEXTAUTH_URL값을 깃허브에 키등록을 하지않아 생긴 오류 env는 gitignore에 들어갔기 때문
```

## 추가 할 목표

```
1. 테스팅 jest 시도
2. 국내 뿐만 아니라 해외도 같이 적용
```
