import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
import './GithubSearch.css';

const GithubSearch: React.FC = () => {
  const [username, setUsername] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const stored = localStorage.getItem('recentSearches');
    return stored ? JSON.parse(stored) : [];
  });
  const [userInfo, setUserInfo] = useState<{ status: 'idle'|'pending'|'resolved'|'rejected'; data: any }>({ status: 'idle', data: null });

  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const getUserInfo = async (user: string) => {
    setUserInfo({ status: 'pending', data: null });
    try {
      const response = await fetch(`https://api.github.com/users/${user}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setUserInfo({ status: 'resolved', data });
    } catch {
      setUserInfo({ status: 'rejected', data: null });
    }
  };

  const handleSearch = (user: string) => {
    getUserInfo(user);
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
      {userInfo.status === 'idle' && <div>검색어를 입력해주세요</div>}
      {userInfo.status === 'pending' && <Spinner />}
      {userInfo.status === 'rejected' && <div>검색 결과를 찾을 수 없습니다</div>}
      {userInfo.status === 'resolved' && userInfo.data && (
        <div className="github-profile-card">
          <button type="button" className="close-btn" onClick={() => setUserInfo({ status: 'idle', data: null })}>×</button>
          <img src={userInfo.data.avatar_url} alt="avatar" className="profile-avatar" />
          <p className="profile-name">{userInfo.data.name}</p>
          <p>아이디: {userInfo.data.login}</p>
          <p>한 줄 소개: {userInfo.data.bio}</p>
          <p>팔로워: {userInfo.data.followers}</p>
          <p>팔로잉: {userInfo.data.following}</p>
          <p><a href={userInfo.data.html_url} target="_blank" rel="noopener noreferrer">{userInfo.data.html_url}</a></p>
        </div>
      )}
    </div>
  );
};

export default GithubSearch;