// PokemonDetail.jsx

import { useParams, Link } from 'react-router';
import axios from 'axios';
import { useState, useEffect } from 'react';
import PokemonStat from '../components/PokemonStat';

const PokemonDetail = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        setPokemon(res.data);
      } catch (error) {
        console.error('포켓몬 상세 정보를 불러오는 데 실패했습니다.', error);
      }
    };

    fetchData();
  }, [name]);

  if (!pokemon) return <div>로딩중...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <Link to='/'>← 목록으로</Link>
      <h1>{name}</h1>

      <img
        src={pokemon.sprites.front_default}
        alt={name}
        style={{ width: '200px', height: '200px' }}
      />
      <div>
        <PokemonStat label='Type' value={pokemon.types[0].type.name} />
        <PokemonStat label='Height' value={pokemon.height} />
        <PokemonStat label='Weight' value={pokemon.weight} />
        <PokemonStat label='Base Experience' value={pokemon.base_experience} />
        <PokemonStat label='Ability' value={pokemon.abilities[0].ability.name} />

      </div>
    </div>
  );
};

export default PokemonDetail;
