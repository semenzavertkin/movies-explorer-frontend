import './Form.css'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.svg';

const AuthForm = (props) => {
  return (
    <section className="form">
      <div className="form__container">
        <Link to="/" className="form__link">
          <img className="form__logo" src={logo} alt="Логотип"></img>
        </Link>
        <h1 className="form__title">{props.title}</h1>
        <form className="form__inputs" onSubmit={props.onSubmit}>
          {props.children}
          <button
            className={`form__submit-btn ${!props.isValid && "form__submit-btn_disabled"}`}
            type="submit"
            aria-label={props.submit}
            disabled={!props.isValid}
          >
            {props.submit}
          </button>
        </form>
        <p className="form__text">
          {props.question}
          <Link to={props.path} onClick={props.resetForm} className="form__link-text">
            {props.link}
          </Link>
        </p>
      </div>

    </section>
  );
};

export default AuthForm