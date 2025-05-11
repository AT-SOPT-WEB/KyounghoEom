import React from 'react';

const PokemonStat = ({ label, value }) => {
  return (
    <div style={{
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        height: '50px'
    }}>

    <p style={{
        fontSize: '20px',
        fontWeight: 'bold',
        margin: 0
    }}>
        {label}
    </p>

    <p style={{ margin:0 }}>
        {value} 
    </p>

    </div>
  );
};

export default PokemonStat;

