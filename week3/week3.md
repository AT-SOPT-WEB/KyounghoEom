# React : Component와 Hooks

## Component

### 왜 클래스형이 아닌 함수형 컴포넌트를 쓰는가

- 함수형 컴포넌트는 매개변수로 props를 받아서, ReactElement를 반환하는 함수
```
const Header = (props) => {
  return <h1>{props.title}</h1>
}
```
#### 왜 props를 쓰는가
- props란? 
  - 부모 컴포넌트가 자식 컴포넌트에게 전달하는 데이터
  - props는 읽기 전용이다. 
    - 자식 컴포넌트에서 props를 수정할 수 없다.
- 왜 props를 쓰는가
  - props를 사용하면 컴포넌트를 재사용할 수 있다.
- React는 단방향 데이터 흐름을 따른다. 
  - 부모 컴포넌트에서 자식 컴포넌트로 데이터가 흐른다.

### children
- 자체 컴포넌트를 중첩하고 싶을 때 사용하는 props

## State
- state란?
  - 컴포넌트 내부에서 관리하는 데이터
  - 컴포넌트가 렌더링될 때마다 state가 
  변경되면, 컴포넌트가 다시 렌더링된다.

## 컴포넌트 반복 (map과 key)
- map을 사용하여 배열을 반복할 수 있다.
- key는 React가 각 컴포넌트를 구별하는데 사용된다.

## 조건부 렌더링


# Key Questions
## 컴포넌트를 어떻게 설계해야 하나?
- SOLID 원칙
  - SIngle Responsibility Principle (SRP)
    - 하나의 컴포넌트는 하나의 책임만 가져야 한다.
## 전역적으로 필요한 상태인가?
- 전역 상태는 성능에 

---

- **⭐ key 값은 언제나 유일해야 한다 ⭐**
    - `state`나 `props`가 변경되면 → `render()` 호출 → 새로운 Render Tree 생성
    - DOM 변화 감지를 위해 React는 diffing 알고리즘 수행 (O(n) 복잡도)
    - 이 과정에서 최소한의 연산으로 UI를 효율적으로 갱신하려 함
    
    diffing 알고리즘 과정에서
    
    1. Element의 타입이 다르면
    → 완전히 새로운 트리를 만들어서 기존 트리는 제거
    2. Element의 타입이 같으면:
    → 기존 트리를 재사용하며 속성만 업데이트함
    → 이때 `key`를 통해 어떤 자식이 같은지 판단
    
    ```jsx
    <ul>
      <li>first</li>
      <li>second</li>
    </ul>
    
    // 이렇게 변경된다면?
    <ul>
      <li>first</li>
      <li>second</li>
      <li>third</li>
    </ul>
    ```
    
    React는 쭉 살펴보며 마지막에 `<li>third</li>`를 추가한다.
    
    ```jsx
    <ul>
      <li>윤지</li>
      <li>진혁</li>
    </ul>
    
    // 이렇게 변경된다면?
    <ul>
      <li>지성</li>
      <li>윤지</li>
      <li>진혁</li>
    </ul>
    ```
    
    위와 같이 리스트의 맨 앞에 Element를 추가하게 되면, 공통된 트리를 그대로 유지하는 대신,
    모든 자식을 변경하여 두 트리 변환이 비효율적으로 일어나게 된다
    
    ```jsx
    <ul>
      <li key="001">윤지</li>
      <li key="002">진혁</li>
    </ul>
    
    // 이렇게 변경된다면?
    <ul>
      <li key="003">지성</li>
      <li key="001">윤지</li>
      <li key="002">진혁</li>
    </ul>
    ```
    
    하지만 위와 같이 자식들이 `key`를 가지고 있다면, React는 `key`를 통해 두 트리의 자식들이 일치하는지 확인하여 `001`과 `002` `key`를 가진 Element는 그저 이동만 하면 된다.
    
    즉, `key` 속성을 통해 비효율적인 트리 변환 문제를 해결할 수 있다
    
    *참고) 키 값은 오로지형제 사이에서만 유일하면 되고, 전역에서 유일할 필요는 없다.*
    
    - **‼️ 기본 index를 key로 쓰면 …?**
        - 배열 순서가 바뀌면 index도 바뀜
            - → key값 또한 바뀌게 됨
            - → 같은 데이터인데 React는 다른 것으로 오인
            - → 결과적으로 불필요한 리렌더링 또는 state 꼬임 발생