# AROO 프론트엔드 과제
![image](https://github.com/JunJongHun/AROOO/assets/90402926/3930a48d-f3bf-4b26-aacb-e9a901fcb1a5)

AROOO WEB 프론트엔드 과제 프로젝트 입니다.

## 개발 환경

- node.js v18.19.1

## 설치 및 실행

### 의존성 패키지 설치

```bash
npm install
```

### 개발 환경 실행

```bash
npm run dev
```

기본 <http://localhost:5173> 로 접속

## 구성 및 선정 이유

- React : React는 널리 사용되는 프론트엔드 라이브러리로 컴포넌트 기반 개발과 가독성 있는 코드 작성을 위해 선택했습니다.
- vite  : Vite는 빠른 개발 환경을 제공하는 빌드 도구로, 개발 효율성을 높이고 개발 시간을 단축하기 위해 선택했습니다.

### 디렉토리 구조

```bash
.
📦src
 ┣ 📂apis
 ┃ ┣ 📜apis.ts
 ┃ ┗ 📜constants.ts
 ┣ 📂assets
 ┃ ┗ 📜arooo.png
 ┣ 📂components
 ┃ ┣ 📜ContentItem.tsx
 ┃ ┣ 📜ContentList.tsx
 ┃ ┗ 📜Header.tsx
 ┣ 📂hooks
 ┃ ┣ 📜useContentList.tsx
 ┃ ┣ 📜useDataFetching.tsx
 ┃ ┗ 📜useInfiniteScroll.tsx
 ┣ 📂mocks
 ┃ ┣ 📜browsers.ts
 ┃ ┣ 📜data.ts
 ┃ ┗ 📜handlers.ts
 ┣ 📂pages
 ┃ ┣ 📜ContentDetailPage.tsx
 ┃ ┣ 📜ContentListPage.tsx
 ┃ ┗ 📜RootLayout.tsx
 ┣ 📂styles
 ┃ ┗ 📜index.css
 ┣ 📜main.tsx
 ┣ 📜router.tsx
 ┣ 📜types.ts
 ┗ 📜vite-env.d.ts
```

### 요구사항 체크 리스트

- [x] Api 서버로부터 콘텐츠 목록을 불러와 화면에 표시합니다.
    - 목록 아이템 항목: 콘텐츠 타이틀, 좋아요 버튼, 좋아요 수
- [x] 목록 내 아이템을 선택하면 콘텐츠 상세 페이지로 이동합니다.
    - 콘텐츠 상세 페이지 항목: 콘텐츠 타이틀, 콘텐츠 본문, 좋아요 버튼, 좋아요 수
- [x] 좋아요 버튼 클릭 시 API를 통해 서버에 값을 업데이트 합니다.
    - 좋아요 버튼은 누를 때마다 좋아요 수의 카운트가 올라갑니다.
- [x] 상세 페이지 내에서의 좋아요 버튼 클릭 시 목록 내 아이템에도 좋아요 수 값이 업데이트가 되어야 합니다.

### 우대사항
- [x] 콘텐츠 목록의 무한 스크롤 구현
- [x] 비지니스 로직 추상화 처리
- [ ] 비지니스 로직 테스트

### 구현 내용

1.  Api 서버로부터 콘텐츠 목록을 불러와 화면에 표시합니다.

![아루1](https://github.com/JunJongHun/AROOO/assets/90402926/fd89547f-fde8-49bd-8db1-746b446ae55b)

  
  
3.  목록 내 아이템을 선택하면 콘텐츠 상세 페이지로 이동합니다.

![아루2](https://github.com/JunJongHun/AROOO/assets/90402926/47c42d2a-c6ba-49a9-888c-c91d8c4876f7)




5.  좋아요 버튼 클릭 시 API를 통해 서버에 값을 업데이트 합니다.
6.  상세 페이지 내에서의 좋아요 버튼 클릭 시 목록 내 아이템에도 좋아요 수 값이 업데이트가 되어야 합니다.

![아루3](https://github.com/JunJongHun/AROOO/assets/90402926/748faece-0751-415e-83d5-73c388e7059f)
