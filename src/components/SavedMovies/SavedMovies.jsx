import './SavedMovies.css';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { mainApi } from '../../utils/MainApi';
import { useEffect, useState } from 'react'

const SavedMovies = (props) => {
  const [movies, setMovies] = useState(props.savedMovies);
  const [initialValue, setInitialValue] = useState('');
  const [shortActive, setShortActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = (searchString) => {
    setInitialValue(searchString);
    const result = movies(props.savedMovies, searchString, setShortActive);
    setMovies(result);
  }
  useEffect(() => {
    setMovies(props.savedMovies);
  }, [props.savedMovies])
  const handleShortFilms = () => setShortActive(!shortActive)

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
    mainApi.getMyMovies()
      .then((res) => {
        setLoading(true);
        setMovies(searchMovieFilter(res, initialValue, shortActive));
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err)
      })
  }, [initialValue, shortActive])
  return (
    <>
      <main className="movies">
        <SearchForm
          onSearch={handleSearch}
          isChecked={shortActive}
          setChecked={handleShortFilms}
          initialValue={initialValue}
        />
        <MoviesCardList
          movies={movies}
          isSavedMoviePage={true}
          onDelete={props.onDelete}
          savedMovies={props.savedMovies}
          loading={loading}
        />
      </main>
    </>
  );
};

export default SavedMovies;