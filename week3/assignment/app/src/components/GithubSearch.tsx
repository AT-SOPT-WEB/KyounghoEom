import React, { useState, useEffect } from 'react';

const GithubSearch: React.FC = () => {
  const [username, setUsername] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const stored = localStorage.getItem('recentSearches');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const handleSearch = (user: string) => {
    console.log('search:', user);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username) return;
    handleSearch(username);
    setRecentSearches(prev => {
      if (prev.includes(username)) return prev;
      const updated = [...prev, username];
      return updated.length > 3 ? updated.slice(updated.length - 3) : updated;
    });
    setUsername('');
  };

  const handleDelete = (name: string) => {
    setRecentSearches(prev => prev.filter(item => item !== name));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="깃허브 아이디를 입력하세요"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit">검색</button>
      </form>
      <ul>
        {recentSearches.map(name => (
          <li key={name}>
            <button type="button" onClick={() => handleSearch(name)}>{name}</button>
            <button type="button" onClick={() => handleDelete(name)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GithubSearch; 