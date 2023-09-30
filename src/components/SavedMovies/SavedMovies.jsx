import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import cards from '../../utils/Movies';
import Footer from '../Footer/Footer';


const SavedMovies = () => {
  return (
    <>
      <Header loggedIn={true} />
      <main className="movies">
        <SearchForm />
        <MoviesCardList cards={cards} />
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;