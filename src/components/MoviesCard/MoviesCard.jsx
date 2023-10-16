import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

const MoviesCard = (props) => {
  const location = useLocation();
  const movie = props.movie;
  const name = movie.nameRU;
  const isSaved = props.savedMovies.some(item => item?.movieId === movie.id);

  // сохранение фильма
  function handleSave() {
    props.onSave(movie);
  }
  // удаление фильма
  function handleDelete() {
    props.onDelete(movie);
  }
  // расчет времени
  function getMovieDuration(mins) {
    return `${Math.floor(mins / 60)}ч ${mins % 60}м`;
  }

  return (
    <li className="card">
      <img className="card__img" src={location.pathname === '/saved-movies' ? `${movie.image}` : `https://api.nomoreparties.co${movie.image.url}`} alt={movie.title}></img>
      {location.pathname === "/saved-movies" ? (
        <button
          type="button"
          onClick={handleDelete}
          className="card-btn card-btn_delete" />
      ) : (
        <button
          type="button"
          onClick={handleSave}
          className={`card-btn card-btn${isSaved ? "_active" : "_inactive"}`}
        />
      )}
      <div className="card__info">
        <h2 className="card__title">{name}</h2>
        <p className="card__duration">{getMovieDuration(movie.duration)}</p>
      </div>
    </li>
  );
};

export default MoviesCard;