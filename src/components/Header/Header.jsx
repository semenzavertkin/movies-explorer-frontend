import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import NavAuth from '../Header/NavAuth/NavAuth';
import Navigation from '../Header/Navigation/Navigation';


const Header = ({ loggedIn }) => {
  return (
    <header className="header">
      <Link to="/" className="header__link">
        <img className="header__logo" src={logo} alt="Логотип"></img>
      </Link>
      {!loggedIn && <NavAuth />}
      {loggedIn && <Navigation />}
    </header>
  );
};

export default Header;