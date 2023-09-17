import Form from '../Form/Form';

function Register() {
  return (
    <Form title="Добро пожаловать!" submit="Зарегистрироваться" question="Уже зарегистрированы?" link="Войти" path="/signin">
      <label className="form__input">
        <p className="form__input-title">Имя</p>
        <input type="text" className="form__field" placeholder="Ваше имя..." required />
        <span className="form__error">Что-то пошло не так...</span>
      </label>

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

export default Register;