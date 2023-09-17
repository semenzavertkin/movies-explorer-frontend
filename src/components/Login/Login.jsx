import Form from '../Form/Form';

function Login() {
  return (
    <Form title="Рады видеть!" submit="Войти" question="Ещё не зарегистрированы?" link="Регистрация" path="/signup">
      <label className="form__input">
        <p className="form__input-title">E-mail</p>
        <input type="email" className="form__field" placeholder="Ваша почта..." required />
        <span className="form__error">Что-то пошло не так...</span>
      </label>

      <label className="form__input">
        <p className="form__input-title">Пароль</p>
        <input type="password" className="form__field" placeholder="Ваш пароль..." required />
        <span className="form__error">Что-то пошло не так...</span>
      </label>
    </Form>
  );
}

export default Login;