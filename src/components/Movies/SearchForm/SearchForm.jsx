import './SearchForm.css';

const SearchForm = () => {
  return (
    <section className="search">
      <form className="search__form">
        <input className="search__input" id='search-film' placeholder="Фильм" type="text" required />
        <button type="submit" className="search__button"></button>
      </form>


      <div className="search__toggle">
        <label className="search__tumbler">
          <input className="search__checkbox" id='movies-filter' type="checkbox" />
          <div class="search__checkmark"></div>
        </label>
        <p className="search__films">Короткометражки</p>
      </div>
    </section>
  );
};

export default SearchForm;