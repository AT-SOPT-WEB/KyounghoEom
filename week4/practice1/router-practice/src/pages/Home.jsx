// Home.jsx

import { Link } from 'react-router';

const Home = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>포켓몬 도감</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        <Link to='/pokemon/피카츄'>피카츄</Link>
        <Link to='/pokemon/이상해씨'>이상해씨</Link>
      </div>
    </div>
  );
};

export default Home;