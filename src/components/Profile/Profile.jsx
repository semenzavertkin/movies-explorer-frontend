import './Profile.css';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Profile = () => {
  const [profileData, setProfileData] = useState({ name: 'Виталий', email: 'pochta@yandex.ru' })
  return (
    <>
      <Header loggedIn={true} />
      <section className="profile">
        <h2 className="profile__title">{`Привет, ${profileData.name}!`}</h2>
        <form className="profile__form">
          <label className="profile__input">
            <p className="profile__input-title">Имя</p>
            <input
              type="text"
              className="profile__field"
              placeholder="Ваше имя..."
              value={profileData.name}
              onChange={e => { setProfileData(state => ({ ...state, name: e.target.value })) }}
              required />
          </label>
          <label className="profile__input">
            <p className="profile__input-title">E-mail</p>
            <input
              type="email"
              className="profile__field"
              placeholder="Ваша почта..."
              value={profileData.email}
              onChange={e => { setProfileData(state => ({ ...state, mail: e.target.value })) }}
              required />
          </label>
        </form>
        <div className="profile__link-container">
          <Link to="/" className="profile__link">Редактировать</Link>
          <Link to="/" className="profile__link profile__link_color">Выйти из аккаунта</Link>
        </div>
      </section>
    </>
  );
};

export default Profile;