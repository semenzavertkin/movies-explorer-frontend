import './Profile.css';
import { Link } from 'react-router-dom';
import useValidation from '../../hooks/useValidation';
import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const Profile = (props) => {
  const currentUser = useContext(CurrentUserContext);
  const name = currentUser.currentUser.name;
  const email = currentUser.currentUser.email;
  const { setIsValid, values, handleChange, isValid } = useValidation({
    name: name,
    email: email,
  });
  const [isSame, setIsSame] = useState(true);

  useEffect(() => {
    setIsValid(true);
  }, [currentUser, setIsValid]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onEditProfile(values);
  }

  useEffect(() => {
    if (name !== values.name || email !== values.email) {
      setIsSame(false);
    } else {
      setIsSame(true);
    }
  }, [name, email, values.name, values.email]);


  return (
    <>
      <main className="profile">
        <h1 className="profile__title">Привет {currentUser.currentUser.name}!</h1>
        <form className="profile__form" onSubmit={handleSubmit}>
          <label className="profile__input">
            <p className="profile__input-title">Имя</p>
            <input
              id="name"
              name="name"
              type="text"
              className="profile__field"
              placeholder="Ваше имя..."
              minLength={2}
              maxLength={40}
              value={values.name}
              onChange={handleChange}
              required
            />
          </label>
          <label className="profile__input">
            <p className="profile__input-title">E-mail</p>
            <input
              type="email"
              className="profile__field"
              placeholder="Ваша почта..."
              value={values.email}
              onChange={handleChange}
              required
            />
          </label>
          <button
            className={`profile__btn  ${isSame || !isValid ? 'profile__btn_disabled' : ''}`}
            disabled={isSame || !isValid}
            type='submit'
            aria-label='Редактировать профиль'
          >
            Редактировать
          </button>
        </form>
        <Link to="/" className="profile__link profile__link" onClick={props.onLogout}>Выйти из аккаунта</Link>
      </main >
    </>
  );
};

export default Profile;