# [아루] AROOO WEB 프론트엔드 과제
![image](https://github.com/JunJongHun/AROOO/assets/90402926/3930a48d-f3bf-4b26-aacb-e9a901fcb1a5)

#### AROOO는 여성을 위한 웰니스 플랫폼 '자기만의방'을 만들고 있습니다.



## 배포 환경 접속 방법
[https://arooo.org](https://arooo.org/)


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

### 개발 환경 접속 방법
<http://localhost:5173>

## 기술 스택

- React
- Typescript
- Vite
- React Query
- Axios
- React Router Dom
- MSW
- Chakra UI
- S3
- CloudFront
- Api Gateway
- Lambda
- DynamoDB

### 디렉토리 구조
<details>
<summary>📦 AROOO 프로젝트 구조</summary>

```bash
📦AROOO
 ┣ 📂.github
 ┃ ┗ 📂workflows
 ┃ ┃ ┗ 📜main.yaml
 ┣ 📂public
 ┃ ┣ 📜arooo_favicon.png
 ┃ ┗ 📜mockServiceWorker.js
 ┣ 📂src
 ┃ ┣ 📂apis
 ┃ ┃ ┣ 📜config.ts
 ┃ ┃ ┗ 📜contents.ts
 ┃ ┣ 📂assets
 ┃ ┃ ┗ 📜arooo.png
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📜ContentItem.tsx
 ┃ ┃ ┣ 📜ContentList.tsx
 ┃ ┃ ┣ 📜Fallback.tsx
 ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┣ 📜HitAreaWrapper.tsx
 ┃ ┃ ┣ 📜QueryErrorBoundary.tsx
 ┃ ┃ ┗ 📜SkeletonContentList.tsx
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜useInfiniteScroll.tsx
 ┃ ┃ ┗ 📜useOptimisticLikeUpdate.tsx
 ┃ ┣ 📂mocks
 ┃ ┃ ┣ 📜browsers.ts
 ┃ ┃ ┣ 📜data.ts
 ┃ ┃ ┗ 📜handlers.ts
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📜ContentDetailPage.tsx
 ┃ ┃ ┣ 📜ContentListPage.tsx
 ┃ ┃ ┗ 📜RootLayout.tsx
 ┃ ┣ 📂styles
 ┃ ┃ ┗ 📜theme.ts
 ┃ ┣ 📜main.tsx
 ┃ ┣ 📜queryClient.ts
 ┃ ┣ 📜router.tsx
 ┃ ┣ 📜types.ts
 ┃ ┗ 📜vite-env.d.ts
 ┣ 📜.eslintrc.cjs
 ┣ 📜.gitignore
 ┣ 📜.gitmessage.txt
 ┣ 📜README.md
 ┣ 📜buildspec.yaml
 ┣ 📜index.html
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜tsconfig.json
 ┣ 📜tsconfig.node.json
 ┗ 📜vite.config.ts
```

</details>

---
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
---
### 구현 내용
- 컴포넌트 내 **비지니스 로직을 Custom Hook으로 추상화** 하여 **재사용성과 UI에 집중 할 수 있도록 분리**
  - `useDataFetching` : 컴포넌트 내 API 요청 코드 작성 시, 중복 작성되는 state, useEffect를 줄이고 데이터 요청에 상태에 따른 state를 쉽게 관리 -> `useQuery`로 대체
  - `useContentList` : 콘텐츠 목록 무한스크롤을 구현하기 위해 다음 목록을 불러올 수 있는지 판단 가능한 hasNext를 포함한 필요한 상태 관리 -> `useInfinitiQuery`로 대체
  - `useInfiniteScroll` : Intersection Observer API를 활용하여 특정 요소를 관찰 할 수 있고, 옵저버가 관찰하는 요소의 가시성 여부에 따라 callbalck 함수 실행 ( 무한스크롤 구현에 활용 )
  - `useOptimisticLikeUpdate` : useMutation을 사용하여 성공시 좋아요 Optimistic UI 적용 및 연관된 다른 캐시값들 동기화, 실패시 Rollback 구현
    
- **서버 부하를 고려하고 빠른 렌더링을 위한 React-Query 캐싱 기능 적용**

- 좋아요 업데이트 시, **Optimistic Update 적용**하여 사용자 경험 개선 고려
  - React-Query를 활용하여 좋아요 버튼 클릭시 캐싱된 값을 먼저 업데이트 하고 API 요청 실패 시, 이전 값으로 **Rollback** 구현
  - 콘텐츠 상세 페이지 좋아요 값 업데이트 성공 시, **콘텐츠 목록에 좋아요 값 동기화**

- Suspense와 useSuspenseQuery를 사용해 사용자에게 예측 가능한 Skeleton UI를 보여줌으로써 렌더링 시간에 대한 체감 감소
  - 무조건 Skeleton UI를 보여주는 것은 사용자 경험에 좋지 않을 수 있기에 응답 속도 0.3s 기준으로 렌더링 여부 결정

- ErrorBoundary를 사용해 UI의 일부분에서 발생하는 자바스크립트 에러가 전체 애플리케이션 중지 하지 않도록 구현

- 좋아요 터치 범위 확장 ( 모바일 고려 )
  - 재사용 가능한 `<HitAreaWrapper/>` 구현

- MSW를 활용하여 Mock Sever를 구현 

- CloudFront + S3 이용한 배포

- Github Actions 이용해 CD 적용

- API 서버 Api Gateway + Lambda + DynamoDB 활용해 Serverless 아키텍처 구현

---
### 구현 화면

#### Api 서버로부터 콘텐츠 목록을 불러오기 ( 무한스크롤 적용 )

![아루1](https://github.com/JunJongHun/AROOO/assets/90402926/fd89547f-fde8-49bd-8db1-746b446ae55b)
---


#### 목록 내 아이템을 선택하면 콘텐츠 상세 페이지로 이동

![아루2](https://github.com/JunJongHun/AROOO/assets/90402926/bb8c3112-0ef5-4ff7-9793-a6d49e859865)
---

#### 좋아요 버튼 클릭 시 API를 통해 서버에 값을 업데이트
#### 상세 페이지 내에서의 좋아요 버튼 클릭 시 목록 내 아이템에도 좋아요 수 값이 업데이트

![아루17](https://github.com/JunJongHun/AROOO/assets/90402926/386fb2b8-2a0a-4728-bbb5-7cadee17905b)
---

#### Suspense 적용 ( 지연로딩 발생 시 )

![아루5](https://github.com/JunJongHun/AROOO/assets/90402926/d19c8856-f7ed-4b78-b9a7-a23406b1fb9a)
---

#### ErrorBoundary 적용
   
![아루4](https://github.com/JunJongHun/AROOO/assets/90402926/dbae83ea-df99-43f3-8c7b-adf89e97bc34)
---

#### 좋아요 터치 범위 확장 
   
적용 전

![아루8](https://github.com/JunJongHun/AROOO/assets/90402926/ce1953f7-2951-438f-8bb5-68a750dadc24)

적용 후

![아루7](https://github.com/JunJongHun/AROOO/assets/90402926/4cc5ea2c-9be8-4349-9acc-86ca9f3955a5)
---
