# allra fintech 🚀

```bash
pnpm add sass --save-dev #scss 설치하기(설치되어 있지 않은 경우)
pnpm add react-intersection-observer #observer 설치하기(설치되어 있지 않은 경우)
```

## 주요 기능

### 1. **올라 마켓 프로젝트**

#### 1-1. **실시간 검색기능**

- **[작업 내용]**
  - 응답 데이터를 처리한 후, 검색어(`q`)가 존재하는 경우, `title`에 검색어가 포함된 제품만 필터링하도록 구현했습니다.
  - 검색은 대소문자를 구분하지 않으며, `toLowerCase()`를 사용하여 검색어와 제품명을 비교합니다.  
    

  ```typescript
  if (success) {
    let newData = data
    if (q && data?.products) {
      const filterData = data?.products.filter((product) =>
        product.title.toLowerCase().includes(q.toLowerCase())
      )
      newData = { ...newData, products: filterData }
    }
    return { status: 'success', data: newData }
  }
  ```

<br/>
<br/>


#### 1-2. **상품 상세 페이지 구현**

- **[작업 내용]**<br/>
![figma](https://github.com/user-attachments/assets/453907b0-3b08-45c3-b106-5c5f84281c13)

  - figma로 레이아웃 작업 후 코딩 작업 진행하였습니다
  - 상품 재고 상태가 최소 주문 수량보다 적음에도 불구하고, `availabilityStatus`가 'In Stock'으로
    표시되는 문제를 해결하였습니다
    <br/>⇒ 재고 없으면 버튼 비활성화
  - 사용자가 선택할 수 있는 수량을 최소 주문 수량(minimumOrderQuantity)부터 재고 수량까지 제한하였습니다
  - 작성자의 개인 정보를 보호하기 위해 리뷰 작성자의 이름을 마스킹 처리하였습니다<br/>
  - 반응형 디자인 작업하였습니다<br/>
<br/>
[참고한 사이트] <br/>
https://hong42.tistory.com/17 <br/>
https://ojjy.tistory.com/106
<br/>
<br/>

    

### 2. **올라 위즈덤 프로젝트**

#### 2-1. **무한스크롤 구현하기**

- **[작업 내용]**<br/>
  **React Query**와 **Intersection Observer**를 활용하여 무한 스크롤 방식으로 quotes 데이터를 가져오고 화면에 렌더링합니다.
  - `useInfiniteQuery` 훅을 사용하여 quotes 데이터를 비동기로 가져왔습니다.<br/>
  `limit`과 `skip` 값을 URL 파라미터로 전달하여 필요한 페이지의 데이터를 요청합니다.
  - 화면 하단에 `ref` 속성을 부여한 `div` 요소가 배치되어 있으며, `useInView` 훅으로 Intersection Observer가 이 요소를 감지할 때마다 <br/>
  다음 페이지 데이터를 요청합니다.
  - `getNextPageParam`에서 마지막 페이지인 경우 `undefined`를 반환하여 추가 데이터 요청을 막고,<br/>
  그렇지 않으면 다음 페이지 번호를 반환하여 요청을 이어갈 수 있습니다.
  - 스크롤 위치가 감지되고 데이터가 로딩 중이 아니며 다음 페이지가 존재할 때만 `fetchNextPage` 함수를 호출하여 추가 데이터를 불러옵니다.
  - Throttle을 적용하여 스크롤 이벤트가 연속적으로 발생하더라도 네트워크 요청이 과도하게 발생하지
  않도록 제한함으로써 성능을 최적화했습니다.
<br/>
[참고한 사이트]<br/>
https://www.youtube.com/watch?v=77TLFKauKTY&t=3242s<br/>
https://oliveyoung.tech/blog/2023-10-04/useInfiniteQuery-scroll/ https://g4daclom.tistory.com/205<br/>
<br/>
<br/>

#### 2-2. **localStorage 활용하여 즐겨찾기에 추가**

- **[작업 내용]**
  - 클릭한 ID에 해당하는 데이터를 찾아주는 함수를 구현하여, 아이디가 있는지 여부와 해당하는 `Quotes` 객체를 반환하도록 작성하였습니다.
  - `localStorage`에 클릭한 데이터가 이미 존재하면 해당 데이터를 삭제하고, 존재하지 않으면 데이터를 추가하는 기능을 구현하였습니다.
  - 즐겨찾기 상태에 따라 버튼의 색상을 변경하도록 구현하였으며, `some` 메서드를 활용하여 클릭한 데이터가 `localStorage`에 <br/>
  저장되어 있는지 확인한 후, `boolean` 값을 props로 전달하였습니다.
  - 즐겨찾기한 데이터를 별도의 페이지에서 확인할 수 있도록 하였으며, 해당 페이지에서도 즐겨찾기 데이터를 해제할 수 있는 기능을 추가하였습니다.<br/>

[참고한 사이트]<br/>
https://blog.banksalad.com/tech/typescript-local-storage/
<br/>
<br/>
<br/>
## 트러블슈팅


- 무한스크롤 이중호출 오류 발생
  react-intersection-observer 라이브러리의 useInView 훅을 사용해 무한 스크롤을 구현하던 중, <br/>
  useInView가 예민하게 반응하여 API 호출이 이중으로 발생하는 문제가 발견되었습니다.<br/>
  해결 방법 ⇒  useThrottle 커스텀 훅을 사용해 무한 스크롤에서 다음 페이지 데이터를 불러오는 함수를 useThrottle로 감싸 호출 간격을 제한했습니다.<br/>
  useThrottle 커스텀 훅은 useRef와 setTimeout을 활용하여, 특정 시간 내에 한 번만 실행되도록 함수 호출을 제어했습니다.<br/><br/>

- localstorage is not defined 오류 발생
  localStorage를 활용하여 즐겨찾기 데이터를 가져오는 기능을 구현하던 중,<br/>
  `localStorage is not defined`라는 오류가 발생했습니다.<br/>

  해결 방법 ⇒ `if (typeof window !== 'undefined')` 조건문을 사용하여 클라이언트 환경에서만 `localStorage`를 실행하도록 수정했습니다. <br/>
  이를 통해 브라우저 환경에서만 `localStorage`를 접근할 수 있도록 안전하게 처리했습니다.
<br/>
[참고한 사이트] <br/>
https://velog.io/@hyo123/Next.js-localStorage-에러핸들링
<br/>
<br/>
<br/>

---

<br/>
<br/>
<br/>


# 올라 프론트엔드 과제 안내

안녕하세요!
여러분의 관심과 지원에 감사드립니다. 본 문서에서는 **과제 전형**을 시작하기 위한 설정 방법을 설명해드리겠습니다.

## 🚀 프로젝트 설치

```bash
npm install -g pnpm # pnpm 설치 (설치되어 있지 않은 경우)
npm install -g nvm # nvm 설치 (설치되어 있지 않은 경우)

nvm install # nvmrc에 설정된 Node.js 버전 설치 및 사용

pnpm install # 의존성 설치

pnpm run dev # 개발 서버 실행
```

## 📝 과제 상세 설명

개발 서버 실행후 http://localhost:3000로 이동하여 과제를 확인해주세요.

## 🙏 유의 사항

1. **외부 도움**을 받지 않고, **자체적으로** 문제를 해결해주세요.
2. 실행에 문제가 있거나 과제 관련 질문이 있다면 이슈를 만들어 내용을 작성하고 `sangmin4208` 계정을 태그해주세요. 확인 후 답변드리겠습니다.

---

## Acknowledgements

This project uses [DummyJSON API](https://github.com/Ovi/DummyJSON) to provide mock data.

### License

DummyJSON is licensed under the MIT License. See the [MIT License](https://opensource.org/licenses/MIT) for more details.











—

db41a50 Merge pull request #17 from yaejin12/feature/wisdom
e2e867a Merge pull request #16 from yaejin12/feature/market
