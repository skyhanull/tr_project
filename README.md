# Pide

![Group 11](https://github.com/user-attachments/assets/990a2521-cfb9-4785-a66f-3b61c8e0d489)

배포주소 :[바로가기](https://pide-p.vercel.app/)

## 📕 프로젝트 소개

지도 서비스의 주변 장소 검색과 원하는 장소들에 대한 길 찾기 시스템을 한 페이지에서 이용할 수 있도록 구현한 서비스입니다.

## 🕛 개발 기간

2024.06 ~ 진행 중

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
<img alt="Typescript" src="https://img.shields.io/badge/Typescript-v4.9.4-3178C6?style=plastic&logoColor=white%22/%3E"/>

<img alt="React" src="https://img.shields.io/badge/React-v18.2.0-61DAFB?style=plastic&logo=react&logoColor=white"/>

<img alt="React Router" src="https://img.shields.io/badge/React Router-v6.8.0-CA4245?style=plastic&logo=reactrouter&logoColor=white"/>
</p>

## 🗂️ 프로젝트 구조

```
📦src
 ┣ 📂app
 ┃ ┣ 📂about
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂map
 ┃ ┃ ┣ 📂[local]
 ┃ ┃ ┃ ┣ 📜directionList.tsx
 ┃ ┃ ┃ ┣ 📜locationList.tsx
 ┃ ┃ ┃ ┣ 📜mapCilent.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜globals.css
 ┃ ┣ 📜layout.tsx
 ┃ ┣ 📜page.tsx
 ┃ ┗ 📜theme.tsx
 ┣ 📂components
 ┃ ┣ 📂filterbar
 ┃ ┃ ┣ 📜fieldSelect.tsx
 ┃ ┃ ┗ 📜search.tsx
 ┃ ┣ 📂kakao
 ┃ ┃ ┣ 📜kakaomap.tsx
 ┃ ┃ ┗ 📜shareKakao.tsx
 ┃ ┣ 📂layout
 ┃ ┃ ┣ 📜footer.tsx
 ┃ ┃ ┣ 📜header.tsx
 ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┣ 📜loader.tsx
 ┃ ┃ ┗ 📜nav.tsx
 ┃ ┣ 📜SearchSuggestions.tsx
 ┃ ┣ 📜busTag.tsx
 ┃ ┣ 📜caresel.tsx
 ┃ ┣ 📜directionModal.tsx
 ┃ ┣ 📜geocoding.tsx
 ┃ ┣ 📜googleMap.tsx
 ┃ ┣ 📜googletrans.tsx
 ┃ ┣ 📜listModal.tsx
 ┃ ┣ 📜mainList.tsx
 ┃ ┣ 📜map.tsx
 ┃ ┣ 📜recoilWapper.tsx
 ┃ ┗ 📜subwayTag.tsx
 ┣ 📂hook
 ┃ ┗ 📜useDebounce.tsx
 ┣ 📂lib
 ┃ ┗ 📜mongodb.tsx
 ┣ 📂models
 ┃ ┣ 📜MapItem.tsx
 ┃ ┗ 📜regionModels.tsx
 ┣ 📂pages
 ┃ ┗ 📂api
 ┃ ┃ ┣ 📜dir.tsx
 ┃ ┃ ┣ 📜directions.tsx
 ┃ ┃ ┣ 📜http.tsx
 ┃ ┃ ┣ 📜mapArray.tsx
 ┃ ┃ ┣ 📜mapbox.tsx
 ┃ ┃ ┣ 📜naverSearch.tsx
 ┃ ┃ ┣ 📜regionList.tsx
 ┃ ┃ ┣ 📜regions.tsx
 ┃ ┃ ┗ 📜scrapePlace.tsx
 ┣ 📂recoil
 ┃ ┗ 📜atoms.tsx
 ┗ 📂utility
 ┃ ┣ 📂interface
 ┃ ┃ ┣ 📜kakao.tsx
 ┃ ┃ ┣ 📜listInterface.tsx
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

1. 주변 장소 검색 / 리스트

```
1. 카카오map을 이용한 키워드 검색을 이용하여 주변 장소 리스트가 나오도록 구현
2. 카카오map 키워드 검색을 이용하여 나오지 않는 정보들은 몽고디비를 이용하여 리스트가 나오도록 함
3. 추가한 장소는 마커로 표시
```

1. 추가한 장소 간 길찾기

```
1. 장소 검색 / 리스트에서 추가한 장소들 간의 길찾기 구현
2. 카카오 map의 길찾기는 자동차만 가능하기 때문에 mapbox를 이용하여 자동차/도보/ 실시간 경로의 길찾기 버전을 추가함
3. 경유지는 최대 5개까지 가능하며 걸리는 총 시간/거리를 나타냄
4. 길찾기 옆 카카오 공유하기로 현재 페이지 공유가능
```

1. 사이트 스크래핑

```
1. 카카오 맵 상세페이지의 가게 상세 정보를 모달로 보여주는 것으로 구현
2. 현재 이 부분은 법적인 문제가 있을 수 있어 주석처리
```

## 추가 할 목표

```
1. 로그인을 하여 원하는 장소/루트 저장 후 공유하기 시 같이 보이도록 수정
2. 국내 뿐만 아니라 해외도 같이 적용
3. 추천 루트,여행지,여행시간 등 데이터 추가
```
