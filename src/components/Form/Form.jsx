import './Form.css'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.png';

const AuthForm = (props) => {
  return (
    <section className="form">
      <div className="form__container">
        <Link to="/" className="form__link">
          <img className="form__logo" src={logo} alt="Логотип"></img>
        </Link>
        <h2 className="form__title">{props.title}</h2>
        <form className="form__inputs">
          {props.children}
          <button className="form__submit-btn" type="submit" aria-label={props.submit}>
            {props.submit}
          </button>
        </form>
        <p className="form__text">
          {props.question}
          <Link to={props.path} className="form__link-text">
            {props.link}
          </Link>
        </p>
      </div>

    </section>
  );
};

export default AuthForm