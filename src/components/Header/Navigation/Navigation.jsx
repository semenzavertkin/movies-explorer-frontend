import './Navigation.css';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';


const Navigation = () => {
  const [nav, setNav] = useState(false);
  const handleToggleMenu = () => setNav(!nav);
  return (
    <nav className="navigation">
      <div className={`navigation__container ${nav ? 'navigation__container_visible' : ''}`}>
        <ul className="navigation__list">
          <li className="navigation__list-item">
            <NavLink to="/" className="navigation__link navigation__link_type_main">Главная</NavLink>
          </li>
          <li className="navigation__list-item">
            <NavLink to="/movies" className="navigation__link">Фильмы</NavLink>
          </li>
          <li className="navigation__list-item">
            <NavLink to="/saved-movies" className="navigation__link">Сохраненные фильмы</NavLink>
          </li>
        </ul>
        <NavLink to="/profile" className="navigation__link navigation__link_type_profile">Аккаунт</NavLink>
      </div>

      <div onClick={handleToggleMenu} className="navigation__menu">
        {nav ? <button className="navigation__btn-close" type="button"></button> : <button className="navigation__btn-burger" type="button"></button>}
      </div>
    </nav>
  );
};

export default Navigation;