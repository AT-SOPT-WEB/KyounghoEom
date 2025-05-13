# 프로젝트 개요

## 1. 파일 위치 및 의존성
- 파일 위치:
  - `src/main.tsx`: 진입점 (ThemeProvider·Global 스타일 적용)
  - `src/App.tsx`: 페이지 전환 로직
  - `src/pages/LoginPage.tsx`: 로그인 화면
  - `src/pages/LoginPage.styles.ts`: 로그인 화면 스타일
  - `src/pages/SignupPage.tsx`: 회원가입 화면
  - `src/pages/SignupPage.styles.ts`: 회원가입 화면 스타일
  - `src/pages/Mypage.tsx`: 마이페이지 화면
  - `src/pages/Mypage.styles.ts`: 마이페이지 스타일
  - `src/styles/reset.ts`: CSS Reset
  - `src/styles/global.ts`: 전역 베이스 스타일
  - `src/styles/theme.ts`: 디자인 토큰 정의
  - `src/styles/emotion.d.ts`: Emotion 테마 타입 선언
- 주요 의존성:
  - React ^19.x, React DOM
  - @emotion/react, @emotion/styled
  - Vite (개발 서버 & 번들러)
  - TypeScript
  - axios

## 2. 로직 흐름
1. `main.tsx`에서 `ThemeProvider`로 테마 공급, `resetStyles`·`globalStyles` 적용 후 `App` 렌더링
2. `App.tsx`:
   - 초기 렌더링 시 `localStorage`에 `userId`가 있으면 자동으로 마이페이지로 이동
   - `page` 상태값(login/signup/mypage)에 따라 각 페이지 컴포넌트 렌더링
   - `onLoginSuccess`, `onNavigateSignup`, `onBackToLogin` 콜백으로 페이지 전환 제어

## 3. 데이터 흐름
- 로그인 시 `LoginPage`에서 입력된 아이디를 `localStorage`에 저장하고, `onLoginSuccess(id)`로 `App`에 전달
- `App`은 `userId` 상태에 저장 후 `mypage`로 전환
- 새로고침 시 `useEffect`로 `localStorage.getItem('userId')`를 읽어 자동 로그인
- `Mypage`에 `userId`를 prop으로 전달하여 인사 메시지 표시

## 4. 스타일링 아키텍처
- **Emotion CSS prop** 사용
  - 컴포넌트 내부에 `useTheme()`으로 테마 받아와 `css={...}` prop으로 스타일 적용
  - 스타일 로직은 각 페이지별 `.styles.ts` 파일로 분리
- **Global 스타일**
  - `reset.ts`로 CSS Reset
  - `global.ts`로 베이스 컬러·폰트 지정
- **Theme 관리**
  - `theme.ts`에 컬러 토큰 정의
  - `emotion.d.ts`에서 TS용 모듈 확장으로 `Theme` 타입 선언
- **설정**
  - `tsconfig.app.json`에 `jsxImportSource: '@emotion/react'` 설정으로 자동 JSX 변환 지원

---

