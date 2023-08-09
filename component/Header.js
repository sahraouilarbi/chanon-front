import headerStyle from '../styles/Header.module.css';

const Header = ( themeMemoire) => {
  return (
    <div>
      <h1 className={headerStyle.title}>
        <span>{themeMemoire}</span>
      </h1>
      <p className={headerStyle.description}>Description</p>
    </div>
  );
};
export default Header;
