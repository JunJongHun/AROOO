# AROO 프론트엔드 과제
![image](https://github.com/JunJongHun/AROOO/assets/90402926/3930a48d-f3bf-4b26-aacb-e9a901fcb1a5)

AROOO WEB 프론트엔드 과제 프로젝트 입니다.

## 개발 환경

- node.js v18.19.1

## 설치 및 실행
### 레파지토리 클론

```bash
$ git clone https://github.com/JunJongHun/AROOO.git
```

### 의존성 패키지 설치

```bash
npm install
```

### 개발 환경 실행

```bash
npm run dev
```

기본 <http://localhost:5173> 로 접속

## 기술 스택

- React
- Typescript
- Vite
- React Query
- Axios
- React Router Dom
- MSW
- Chakra UI

### 디렉토리 구조

```bash
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
- 컴포넌트 내 비지니스 로직을 Custom Hook으로 추상화 하여 재사용성과 UI에 집중 할 수 있도록 분리
  - useDataFetching : 컴포넌트 내 API 요청 코드 작성 시, 중복 작성되는 state, useEffect를 줄이고 데이터 요청에 상태에 따른 state를 쉽게 관리
  - useContentList : 콘텐츠 목록 무한스크롤을 구현하기 위해 다음 목록을 불러올 수 있는지 판단 가능한 hasNext를 포함한 필요한 상태 관리
  - useInfiniteScroll : Intersection Observer API를 활용하여 특정 요소를 관찰 할 수 있고, 옵저버가 관찰하는 요소의 가시성 여부에 따라 callbalck 함수 실행 ( 무한스크롤 구현에 활용 )

- MSW를 활용하여 Mock Sever를 구현 

- 서버 부하를 줄이고 빠른 렌더링을 위한 React-Query 캐싱 기능 적용

- 좋아요 업데이트 시, Optimistic Update 적용하여 사용자 경험 개선 고려
  - React-Query를 활용하여 좋아요 버튼 클릭시 캐싱된 값을 먼저 업데이트 하고 API 요청 실패 시, 이전 값으로 Rollback 구현
  - 콘텐츠 상세 페이지 좋아요 값 업데이트 성공 시, 콘텐츠 목록에 좋아요 값 동기화


### 구현 화면

1.  Api 서버로부터 콘텐츠 목록을 불러와 화면에 표시합니다.

![아루1](https://github.com/JunJongHun/AROOO/assets/90402926/fd89547f-fde8-49bd-8db1-746b446ae55b)

  
  
2.  목록 내 아이템을 선택하면 콘텐츠 상세 페이지로 이동합니다.

![아루2](https://github.com/JunJongHun/AROOO/assets/90402926/47c42d2a-c6ba-49a9-888c-c91d8c4876f7)




3.  좋아요 버튼 클릭 시 API를 통해 서버에 값을 업데이트 합니다.
4.  상세 페이지 내에서의 좋아요 버튼 클릭 시 목록 내 아이템에도 좋아요 수 값이 업데이트가 되어야 합니다.

![아루3](https://github.com/JunJongHun/AROOO/assets/90402926/748faece-0751-415e-83d5-73c388e7059f)
