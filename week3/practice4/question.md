## 1. 기존 구조

- **App.jsx**  
  - `search` 상태와 `setSearch` 함수가 있음
  - `handleSearch`로 검색어를 변경
  - `filteredMembers`로 검색 결과를 필터링

- **Search.jsx**  
  - input의 변경을 부모(App)에게 알림

---

## 2. 문제점

- 검색 관련 상태(`search`)와 로직(`handleSearch`, `filteredMembers`)이 App에 직접 있음
- 만약 다른 컴포넌트에서도 검색 기능이 필요하다면, 중복 코드가 생김

---

## 3. 커스텀 훅으로 분리하기

### 3-1. 커스텀 훅 생성

`src/hooks/useSearch.js` 파일을 만듭니다.

```js
import { useState, useMemo } from 'react';

function useSearch(data, keys = []) {
  const [search, setSearch] = useState('');

  // 검색어로 데이터 필터링
  const filtered = useMemo(() => {
    if (!search) return data;
    return data.filter(item =>
      keys.some(key =>
        item[key].toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, data, keys]);

  return {
    search,
    setSearch,
    filtered,
  };
}

export default useSearch;
```

---

### 3-2. App.jsx에서 커스텀 훅 사용

```jsx
import Card from './components/Card';
import Header from './components/Header';
import Search from './components/Search';
import { members } from './data/member';
import useSearch from './hooks/useSearch';

function App() {
  // 커스텀 훅 사용
  const { search, setSearch, filtered } = useSearch(members, [
    'name',
    'englishName',
    'github',
  ]);

  // 검색어 변경 핸들러
  const handleSearch = (value) => setSearch(value);

  return (
    <>
      <Header />
      <Search search={search} handleSearchChange={handleSearch} />
      <section style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', marginTop: '20px' }}>
        {filtered.map((member) => (
          <Card
            key={member.id}
            id={member.id}
            name={member.name}
            github={member.github}
            englishName={member.englishName}
          />
        ))}
      </section>
    </>
  );
}

export default App;
```

---

### 3-3. Search.jsx는 그대로 사용

Search 컴포넌트는 변동 없음.

---

## 4. 정리

- **검색 상태와 필터링 로직**을 커스텀 훅(`useSearch`)으로 분리
- **App.jsx**는 검색 상태와 결과만 받아서 사용
- **재사용성**이 높아지고, 코드가 더 깔끔해짐

---

## 5. 장점

- 검색 로직을 여러 곳에서 쉽게 재사용 가능
- App 컴포넌트가 더 간결해짐
- 검색 기준(key)만 바꿔서 다양한 데이터에 적용 가능

---

이렇게 커스텀 훅으로 분리하면, 검색 기능이 필요한 다른 컴포넌트에서도  
`useSearch(데이터, 검색할 key 배열)`만 호출하면 바로 사용 가능