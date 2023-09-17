import './MoviesCard.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const MoviesCard = ({ card }) => {
  const location = useLocation();
  const [isFavorite, setIsFavorite] = useState(false);

  function handleFavoriteToggle() {
    setIsFavorite(!isFavorite);
  }
  return (
    <li className="card">
      <img className="card__img" src={card.image} alt={card.title}></img>
      {location.pathname === "/saved-movies" ? (
        <button
          type="button"
          className="card__btn card__btn-delete" />
      ) : (
        <button
          type="button"
          onClick={handleFavoriteToggle}
          className={`card__btn card__btn-like${isFavorite ? "_active" : "_inactive"}`}
        />
      )}
      <div className="card__info">
        <h2 className="card__title">{card.title}</h2>
        <p className="card__duration">{card.duration}</p>
      </div>
    </li>
  );
};

export default MoviesCard;