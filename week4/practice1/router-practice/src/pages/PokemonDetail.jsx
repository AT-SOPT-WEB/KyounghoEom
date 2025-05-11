// PokemonDetail.jsx

import { useParams, Link } from 'react-router';

const PokemonDetail = () => {
  const { name } = useParams();
  
  return (
    <div style={{ padding: '2rem' }}>
      <Link to='/'>← 목록으로</Link>
      <h1>{name}</h1>
      <p>상세정보 ...</p>
    </div>
  );
};

export default PokemonDetail;
