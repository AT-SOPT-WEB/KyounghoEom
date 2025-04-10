# 웹사이트 구조 분석 (week1-2)

## HTML 구조 (`index.html`)

```
body
├── header (position: fixed)
│   ├── div.logo
│   │   └── img (로고)
│   ├── h1.title (블로그 제목)
│   └── div.menu-icon
│       └── i.fas.fa-bars (메뉴 아이콘)
│
├── nav (position: fixed)
│   └── ul
│       ├── li > a (href="#home")
│       ├── li > a (href="#section1")
│       ├── li > a (href="#section2")
│       ├── li > a (href="#section3")
│       └── li > a (href="#banner")
│
├── div.content-wrapper (padding 적용)
│   ├── section#home.home-top (display: grid)
│   │   ├── div.grid-item.item1
│   │   ├── div.grid-item.item2
│   │   ├── div.grid-item.item3
│   │   ├── div.grid-item.item4
│   │   └── div.grid-item.item5
│   │
│   └── main
│       ├── section#section1.card-section
│       │   ├── h2 (섹션 제목)
│       │   └── div.card-container (display: grid, 반응형)
│       │       ├── div.card
│       │       │   ├── img
│       │       │   └── div.card-content
│       │       │       ├── p (카드 설명)
│       │       │       └── button.like-button > i.far.fa-heart (좋아요)
│       │       └── ... (다른 카드들)
│       │
│       ├── section#section2.card-section
│       │   └── ... (section1과 유사한 구조)
│       │
│       ├── section#section3.card-section
│       │   └── ... (section1과 유사한 구조)
│       │
│       └── section#banner.infinite-banner
│           ├── h2 (배너 제목)
│           └── div.banner-container
│               └── div.banner-content (display: flex, animation 적용)
│                   ├── span > img (배너 이미지)
│                   └── ... (다른 배너 이미지들, 복제 포함)
│
└── footer
    └── p (저작권 정보)

```

**주요 특징:**

*   **시맨틱 구조**: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` 등 시맨틱 태그 사용.
*   **고정 레이아웃**: `<header>` (상단)와 `<nav>` (좌측)는 `position: fixed`로 고정.
*   **콘텐츠 래퍼**: `.content-wrapper`가 고정 요소를 제외한 실제 콘텐츠 영역을 감싸며 패딩 제공.
*   **Grid 레이아웃**: `.home-top` 섹션과 `.card-container`에서 Grid를 사용하여 요소 배치. 카드 컨테이너는 반응형 Grid (`repeat(auto-fit, minmax(280px, 1fr))`).
*   **Flexbox 레이아웃**: `<header>` 내부 요소 배치, `.card-content` 내부 요소 배치, `.banner-content` 내부 이미지 배치에 Flexbox 사용.
*   **섹션 구분**: 각 주요 콘텐츠 영역은 `<section>` 태그로 구분되며, ID를 통해 네비게이션 타겟 지정.
*   **컴포넌트화**: 카드(`.card`), 그리드 아이템(`.grid-item`) 등 반복되는 UI 요소는 클래스로 정의.

## CSS 구조 (`style.css`)

1.  **기본/전역 스타일**:
    *   `*` 선택자: `margin`, `padding` 초기화, `box-sizing: border-box`.
    *   `html`: `scroll-behavior: smooth`.
    *   `body`: 기본 `font-family`, 고정 요소 고려한 `padding`, `line-height`.
    *   기본 태그 (`a`, `ul`, `img`, `button`): 스타일 초기화 및 기본 설정.
2.  **레이아웃 스타일**:
    *   `header`, `nav`: `position: fixed` 및 관련 속성 (`top`, `left`, `right`, `width`, `height`, `z-index`)으로 고정 레이아웃 구현. `display: flex` (header 내부) 활용.
    *   `.content-wrapper`: `padding`으로 콘텐츠 영역 확보.
    *   `.home-top`: `display: grid`, `grid-template-columns`, `grid-template-rows`, `gap`으로 그리드 정의. 각 `.itemX` 클래스에 `grid-column`, `grid-row`로 배치.
    *   `.card-container`: `display: grid`, `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`, `gap`으로 반응형 카드 그리드 구현.
    *   `.card`: 배경, 테두리, 그림자, `overflow: hidden` 등 카드 디자인. `object-fit: cover`로 이미지 비율 제어.
    *   `.infinite-banner`: `overflow: hidden`. `.banner-content`에 `display: flex`, `animation` 적용. `@keyframes infinite-scroll` 정의.
    *   `footer`: 배경, 색상, 정렬. `margin-left`, `padding-left`로 고정 네비게이션 너비 보정.
3.  **컴포넌트/세부 스타일**:
    *   헤더 내부 (`.logo`, `.title`, `.menu-icon`): `flex: 1` 및 `justify-content`로 3분할 및 정렬.
    *   네비게이션 메뉴 (`nav ul li a`): `display: block`, `padding`, `margin`, `border-radius`, `transition` 및 `:hover` 스타일. `:first-child`, `:last-child` 활용한 심화 스타일.
    *   카드 내부 (`.card-content`, `.like-button`): `display: flex`, `justify-content: space-between` 및 버튼 `:hover` 스타일.
4.  **상호작용 및 애니메이션**:
    *   `:hover` 가상 클래스: 네비게이션 메뉴, 카드, 좋아요 버튼에 적용.
    *   `transition`: 부드러운 스타일 변경 효과.
    *   `@keyframes` 및 `animation`: 무한 배너 스크롤 효과 구현.
5.  **반응형 디자인**:
    *   `@media (max-width: 992px)`: 네비게이션 숨김, 헤더/푸터/콘텐츠 래퍼 레이아웃 조정.
    *   `@media (max-width: 768px)`: 헤더 크기 축소, `.home-top` 그리드 구조 변경, `.card-container` 1열 변경, 폰트 크기 조정.

**주요 특징:**

*   **모듈식 접근**: 각 컴포넌트(헤더, 네비, 카드 등)별로 스타일 분리.
*   **레이아웃 기법 활용**: `position: fixed`, `Flexbox`, `Grid`를 목적에 맞게 사용.
*   **반응형 처리**: `@media` 쿼리를 사용하여 화면 크기에 따른 레이아웃 및 스타일 변경.
*   **상호작용 및 시각 효과**: `:hover`, `transition`, `animation`을 통한 동적인 UI 구현.
*   **단위 및 색상**: `px`, `rem`, `vh` 등 다양한 단위 사용. 색상은 HEX 코드 사용.
