import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { moviesApi } from '../../utils/MoviesApi';
import { useState, useEffect } from 'react';


const Movies = (props) => {
  const [movies, setMovies] = useState([]);
  const [initialValue, setInitialValue] = useState(localStorage.getItem('initialValue') === null ? '' : localStorage.getItem('initialValue'));
  const [shortActive, setShortActive] = useState(JSON.parse(localStorage.getItem('shortActive')) === null ? false : JSON.parse(localStorage.getItem('shortActive')));

  const handleSearch = (searchString) => setInitialValue(searchString);
  const setChecked = () => setShortActive(!shortActive)

  const searchMovieFilter = (allMovies, initialValueStr, shortActive) => {
    const regExp = new RegExp(`${initialValueStr}`, 'i')
    let filtredMovies = allMovies.filter(function (movie) {
      return regExp.test(movie.nameRU);
    })
    if (shortActive) {
      return filtredMovies.filter(function (movie) {
        return movie.duration <= 40;
      })
    }
    return filtredMovies;
  }

  useEffect(() => {
    localStorage.setItem('shortActive', shortActive)
    if (initialValue) {
      localStorage.setItem('initialValue', initialValue)
      moviesApi.getMovies()
        .then((res) => {
          setMovies(searchMovieFilter(res, initialValue, shortActive));
        })
        .catch(err => console.log(err))
    }
  }, [initialValue, shortActive]);
  return (
    <>
      <main className="movies">
        <SearchForm
          onSearch={handleSearch}
          isChecked={shortActive}
          setChecked={setChecked}
          initialValue={initialValue}
        />
        <MoviesCardList
          movies={movies}
          onSave={props.onSave}
          savedMovies={props.savedMovies}
        />
      </main>
    </>
  );
};

export default Movies;