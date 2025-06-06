import Card from './components/Card';
import Header from './components/Header';
import Search from './components/Search';
import useSearch from './hooks/useSearch';
import { members } from './data/member';

function App() {

// App.jsx의 handleSearch 함수는 검색어 상태 search를 업데이트하는 역할을 한다
// handleSearch 함수는 Search 컴포넌트에서 검색어가 변경될 때 호출된다
// 이 함수는 Search 컴포넌트에서 전달된 검색어를 인자로 받아서 setSearch 함수를 호출하여 상태를 업데이트한다
// 이로 인해 App 컴포넌트의 search 상태가 변경되고, 이를 통해 필터링된 멤버 목록이 업데이트된다
// 즉 App 컴포넌트가 검색어 상태를 가지고 있고, 이 값을 바꿔야 검색 결과가 갱신됩니다.
  const { search, filteredMembers, handleSearchChange, handleSearch } =
  useSearch(members);

  return (
    <>
      <Header />
      <Search 
        search={search} 
        handleSearchChange={handleSearchChange} 
        handleSearch={handleSearch}
      />
      <section style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', marginTop: '20px' }}>
        {filteredMembers.map((member) => (
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


// `<Search search={search} handleSearchChange={handleSearch} />`는 **App에서 Search로 값을 넘겨주는 것**
// - `search={search}`:  
// 이렇게 양방향으로 연결
//  App의 상태값(`search`)을 Search 컴포넌트의 props로 전달
//  → 즉, input의 value로 사용되어 현재 검색어가 input에 표시
// - `handleSearchChange={handleSearch}`:  
// App의 함수(`handleSearch`)를 Search 컴포넌트의 props로 전달
//  → input이 바뀔 때마다 Search가 이 함수를 호출해서 App의 상태를 바꿈
// - App이 `search` 값을 Search에 넘겨줌(상태 내려주기)
// - Search가 input 변경을 App에 알려줌(이벤트 올려주기)
// App이 상태를 관리하고, Search는 입력 UI만 담당
// 이 패턴을 **"상태 끌어올리기(lifting state up)"**이라고 한다