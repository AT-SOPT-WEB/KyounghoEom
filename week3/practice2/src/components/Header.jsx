import header from './Header.module.css';

const Header = () => {
  return (
    <header className={header.header}>
      <h1 className={header.title}>스웹팟 파트원</h1>
    </header>
  );
};

export default Header;