import React from 'react';
import styled from '@emotion/styled';

interface HeaderProps {
  activeTab: 'github' | 'baseball';
  onTabChange: (tab: 'github' | 'baseball') => void;
}

const Container = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0 12px 0;
  border-bottom: 1px solid #eee;
`;

const Tabs = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 12px;
`;

const Tab = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  font-size: 1.1rem;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  color: ${({ active }) => (active ? '#1976d2' : '#888')};
  border-bottom: 2px solid ${({ active }) => (active ? '#1976d2' : 'transparent')};
  padding: 8px 16px;
  cursor: pointer;
`;

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => (
  <Container>
    <h1>숫자야구 & 깃허브 검색</h1>
    <Tabs>
      <Tab active={activeTab === 'github'} onClick={() => onTabChange('github')}>깃허브 검색</Tab>
      <Tab active={activeTab === 'baseball'} onClick={() => onTabChange('baseball')}>숫자야구 게임</Tab>
    </Tabs>
  </Container>
);

export default Header; 