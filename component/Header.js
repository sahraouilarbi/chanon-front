import headerStyle from '../styles/Header.module.css';

const Header = () => {
  return (
    <div>
      <h1 className={headerStyle.title}>
        <span>Chanon</span> Project
      </h1>
      <p className={headerStyle.description}>Description</p>
    </div>
  );
};
export default Header;
