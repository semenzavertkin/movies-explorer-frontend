import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Preloader from '../Movies/Preloader/Preloader'

import {
  SCREEN_1280,
  SCREEN_480,
  CARDS_1280,
  CARDS_768,
  CARDS_480,
  ADD_CARD_1280,
  ADD_CARD_480,
} from '../../utils/constants';


const MoviesCardList = (props) => {
  const [moviesToShow, setMoviesToShow] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const currentScreen = window.innerWidth;
      let count;
      if (location.pathname !== '/movies') count = (props.movies.length);
      else if (currentScreen >= SCREEN_1280) count = CARDS_1280;
      else if (currentScreen >= SCREEN_480) count = CARDS_768;
      else count = CARDS_480;
      setMoviesToShow(props.movies.slice(0, count));
    };

    handleResize();
    const resizeTimeout = setTimeout(handleResize, 300);
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, [location.pathname, props.movies]);

  const handleMore = () => {
    const currentCount = moviesToShow.length;
    const currentScreen = window.innerWidth;
    let addCount;

    if (currentScreen >= SCREEN_1280 + 1) {
      addCount = ADD_CARD_1280;
    } else {
      addCount = ADD_CARD_480;
    }

    setMoviesToShow(props.movies.slice(0, currentCount + addCount));
  };

  return (
    <section className="cards">
      <ul className="cards__list">
        {
          props.loading ? <Preloader /> :
            props.movies.length === 0 ? <h1 className="cards__list_err">Ничего не найдено</h1> :
              moviesToShow.map((movie) => (
                <MoviesCard
                  key={movie.id || movie.movieId}
                  movie={movie}
                  onSave={props.onSave}
                  onDelete={props.onDelete}
                  savedMovies={props.savedMovies}
                />
              ))

        }
      </ul>
      {moviesToShow.length < props.movies.length && (
        <button className='cards__more-btn' type='button' onClick={handleMore}>
          Ещё
        </button>
      )}
    </section>
  );
};

export default MoviesCardList;