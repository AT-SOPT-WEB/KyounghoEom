### 1. CSS 변수(커스텀 프로퍼티) 도입
`:root`에 CSS 변수를 추가하여 색상 값과 그라디언트 등을 관리하도록 했습니다. 이를 통해 일관성 있는 색상 관리와 유지보수성을 높였습니다.

```css
:root {
    --color-primary: #333;
    --color-background: #f4f4f4;
    --color-white: #fff;
    --color-hover: #000;
    --color-heart: #e74c3c;
    --color-heart-inactive: #ccc;
    --color-shadow: rgba(0, 0, 0, 0.1);
    --color-shadow-hover: rgba(0, 0, 0, 0.15);
    --gradient-header: linear-gradient(to right, rgba(230, 230, 250, 0.8), rgba(211, 211, 211, 0.8));
    --gradient-nav: linear-gradient(to bottom, rgba(230, 230, 250, 0.8), rgba(211, 211, 211, 0.8));
    --gradient-section1: linear-gradient(to bottom right, rgba(255, 192, 203, 0.4), rgba(255, 223, 230, 0.4));
    --gradient-section2: linear-gradient(to bottom right, rgba(173, 216, 230, 0.4), rgba(224, 255, 255, 0.4));
    --gradient-section3: linear-gradient(to bottom right, rgba(255, 160, 122, 0.4), rgba(255, 228, 196, 0.4));
}
```

### 2. 클래스 기반 스타일링 적용
ID 선택자보다 클래스 선택자를 사용하여 스타일링했습니다. BEM(Block Element Modifier) 방식을 적용하여 클래스명을 명확하게 구성했습니다.

```css
.header__logo, .header__title, .nav__link, .card__content, .card__image 등
```

### 3. 의미 있는 ID 이름으로 변경
섹션 ID를 `#section1`, `#section2`, `#section3`에서 `#section-spring`, `#section-summer`, `#section-fall`로 변경하여 더 직관적으로 인식할 수 있게 했습니다.

### 4. 일관된 단위 사용 (rem)
px 단위를 rem 단위로 변경하여 접근성 및 반응형 디자인에 더 적합하게 수정했습니다.

```css
height: 3.75rem; /* 60px */
padding: 1.25rem; /* 20px */
```

### 5. 인라인 스타일 제거
HTML 내 인라인 스타일을 제거하고 외부 CSS 파일로 모든 스타일을 이동했습니다.

```html
<!-- 변경 전 -->
<img src="images/logo.png" alt="로고" style="width: 50px; height: auto;">

<!-- 변경 후 -->
<img src="images/logo.png" alt="망고 강아지 로고" class="header__logo-img">
```

### 6. 이미지 alt 속성 개선
이미지의 alt 속성을 더 구체적으로 설명하도록 수정했습니다.

```html
<!-- 변경 전 -->
<img src="images/7.jpeg" alt="Card Image 1">

<!-- 변경 후 -->
<img src="images/7.jpeg" alt="봄 시즌 망고 산책 사진" class="card__image">
```

### 7. 적절한 HTML 구조 적용
`span` 대신 `div` 요소를 사용하여 배너 이미지를 감싸도록 수정했습니다.

```html
<!-- 변경 전 -->
<span><img src="images/1.jpeg" alt="Banner Image 1"></span>

<!-- 변경 후 -->
<div class="banner-item"><img src="images/1.jpeg" alt="망고 배너 이미지 1"></div>
```

### 8. z-index 값 최소화
z-index 값을 1000, 999와 같은 큰 값에서 10, 9와 같은 최소한의 값으로 변경했습니다.

```css
.header {
    z-index: 10; /* 기존 1000 */
}

.nav {
    z-index: 9; /* 기존 999 */
}
```

### 9. `body` 패딩 대신 레이아웃 컴포넌트 사용
body에 직접 주던 padding을 layout-wrapper 클래스로 이동하여 관리하도록 변경했습니다.

```css
.layout-wrapper {
    padding-top: 3.75rem;
    padding-left: 10rem;
}
```

### 10. inherit 제거
a 태그에서 불필요한 `color: inherit` 속성을 제거하고 직접 색상을 지정했습니다.

```css
a {
    text-decoration: none;
    color: var(--color-primary);
}
```

### 11. section 요소에 공통 클래스 적용
ID를 가진 모든 section에 공통 클래스 `section`을 추가하여 스타일을 일관되게 적용했습니다.

```css
.section {
    scroll-margin-top: 5rem;
}
```

### 12. 카드 컨텐츠 구조 개선
카드 내부 구조를 flexbox를 활용하여 개선했습니다.

```css
.card__content {
    padding: 0.9375rem;
    position: relative;
    text-align: center;
    min-height: 3.125rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
```

### 13. reset.css 분리
리뷰어의 제안에 따라 스타일 초기화 코드를 별도의 reset.css 파일로 분리했습니다.

```css
/* reset.css 파일 내용 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
    font-size: 16px;
}

/* 그 외 초기화 스타일... */
```

HTML 파일에도 reset.css를 연결했습니다.

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>경호의 블로그</title>
    <link rel="stylesheet" href="reset.css">
    <link rel="stylesheet" href="style.css">
    <!-- Font Awesome CDN -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
```

## 결과 및 근거

위와 같은 수정을 통해 다음과 같은 개선 효과를 얻을 수 있었습니다:

1. **유지보수성 향상**: CSS 변수를 통해 색상 및 공통 스타일 값을 일괄 관리할 수 있게 되었습니다.
2. **가독성 개선**: BEM 방식의 클래스 네이밍과 의미 있는 ID를 통해 코드의 가독성이 높아졌습니다.
3. **접근성 강화**: rem 단위 사용으로 사용자의 기본 폰트 크기에 따라 적절하게 조정되는 반응형 디자인이 가능해졌습니다.
4. **일관성 확보**: 공통 클래스를 통한 스타일 적용으로 코드의 일관성이 향상되었습니다.
5. **HTML 의미성 강화**: 적절한 alt 속성과 의미 있는 요소 선택으로 HTML의 의미론적 구조가 개선되었습니다.
6. **파일 구조 개선**: reset.css를 분리하여 코드의 역할에 따라 파일을 구분함으로써 관리 용이성이 향상되었습니다.

이러한 수정은 단순히 현재의 디자인을 구현하는 것을 넘어, 향후 프로젝트 확장이나 유지보수 시 더 효율적인 작업을 가능하게 합니다.

## 추가 개선 사항 (2차 수정)

### 1. border-radius 간소화 및 일관성 개선
리뷰어의 제안을 반영하여 border-radius 값을 CSS 변수로 정의하고, 일관되게 적용했습니다. 이를 통해 디자인 시스템의 일관성을 높이고 유지보수성을 개선했습니다.

```css
:root {
    /* 기존 변수들... */
    --border-radius-small: 0.3125rem;
    --border-radius-medium: 0.5rem;
    --border-radius-large: 0.9375rem;
}

/* 변수 적용 예시 */
.card {
    border-radius: var(--border-radius-medium);
}

.banner-item img {
    border-radius: var(--border-radius-small);
}

/* 복합 border-radius 적용 */
.nav__item:first-child .nav__link:hover {
    border-radius: var(--border-radius-medium) var(--border-radius-medium) 0 0;
}

.nav__item:last-child .nav__link:hover {
    border-radius: 0 0 var(--border-radius-medium) var(--border-radius-medium);
}
```


