const Search = ({ search, handleSearchChange, handleSearch }) => {

// Search 컴포넌트는 검색어를 입력받는 input 요소를 렌더링
// input의 값이 바뀔 때마다 부모(App)에게 변경된 값을 전달
// input의 변경 이벤트(onChange)는 이벤트 객체를 반환, 
// 이 객체에서 실제 입력값(e.target.value)을 꺼내서 부모에게 전달해야 함

    return (
        <div>
            <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="검색"
            />
            <button onClick={handleSearch}>검색</button>
        </div>
    );
}
export default Search;