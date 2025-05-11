// pages/Home.jsx
import { useEffect, useState } from 'react';
import PokemonCard from '../components/PokemonCard';
import axios from 'axios';

const Home = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          'https://pokeapi.co/api/v2/pokemon?limit=40'
        );
        setPokemonList(res.data.results);
      } catch (error) {
        console.error('포켓몬 리스트를 불러오는 데 실패했습니다.', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>포켓몬 도감</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} />
        ))}
      </div>
    </div>
  );
};

export default Home;