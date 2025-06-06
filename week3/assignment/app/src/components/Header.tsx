import React from 'react';
import './Header.css';

interface HeaderProps {
  activeTab: 'github' | 'baseball';
  onTabChange: (tab: 'github' | 'baseball') => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => (
  <header className="header-container">
    <h1>숫자야구 & 깃허브 검색</h1>
    <div className="header-tabs">
      <button 
        className={`header-tab ${activeTab === 'github' ? 'active' : ''}`}
        onClick={() => onTabChange('github')}
      >
        깃허브 검색
      </button>
      <button 
        className={`header-tab ${activeTab === 'baseball' ? 'active' : ''}`}
        onClick={() => onTabChange('baseball')}
      >
        숫자야구 게임
      </button>
    </div>
  </header>
);

export default Header; 