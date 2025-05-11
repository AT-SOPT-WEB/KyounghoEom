// components/PokemonCard.jsx
import { useNavigate } from 'react-router';

const PokemonCard = ({ name }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokemon/${name}`);
  };

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '1rem',
        borderRadius: '8px',
        cursor: 'pointer',
        width: '120px',
        textAlign: 'center',
        background: '#f9f9f9',
      }}
      onClick={handleClick}
    >
      <p>{name}</p>
    </div>
  );
};

export default PokemonCard;