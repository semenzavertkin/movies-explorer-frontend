import './SavedMovies.css';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { mainApi } from '../../utils/MainApi';
import { useEffect, useState } from 'react'

const SavedMovies = (props) => {
  const [movies, setMovies] = useState([]);
  const [hideCard, setHideCard] = useState(false)
  const [initialValue, setInitialValue] = useState('');
  const [shortActive, setShortActive] = useState(false);

  const handleSearch = (searchString) => setInitialValue(searchString);
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
        setHideCard(false)
        setMovies(searchMovieFilter(res, initialValue, shortActive));
      })
      .catch((err) => {
        console.log(err)
      })
  }, [initialValue, shortActive, hideCard])
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
        />
      </main>
    </>
  );
};

export default SavedMovies;