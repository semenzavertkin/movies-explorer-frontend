import './SearchForm.css';

const SearchForm = () => {
  return (
    <form className="search">
      <div className="search__form">
        <input className="search__input" id='search-film' placeholder="Фильм" type="text" required />
        <button type="submit" className="search__button"></button>
      </div>


      <div className="search__toggle">
        <label className="search__tumbler">
          <input className="search__checkbox" id='movies-filter' type="checkbox" />
          <span class="search__checkmark"></span>
        </label>
        <p className="search__films">Короткометражки</p>
      </div>
    </form>
  );
};

export default SearchForm;