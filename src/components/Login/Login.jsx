
import Form from '../Form/Form';
import Input from '../Input/Input';
import useValidation from '../../hooks/useValidation';

function Login(props) {
  const { values, errors, handleChange, isValid, setIsValid } = useValidation({ email: '', password: '' });

  function handleSubmit(e) {
    setIsValid(false);
    e.preventDefault();
    props.onLogin(values.email, values.password);
  }
  return (
    <main className="login">
      <Form
        title="Рады видеть!"
        submit="Войти"
        question="Ещё не зарегистрированы?"
        link="Регистрация"
        path="/signup"
        onSubmit={handleSubmit}
        isValid={isValid}
      >
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Ваша почта..."
          required
          errors={errors.email || ''}
          value={values.email || ''}
          onChange={handleChange}
        />

        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Ваш пароль..."
          required
          minLength={8}
          errors={errors.password || ''}
          value={values.password || ''}
          onChange={handleChange}
        />
      </Form>
    </main>
  );
}

export default Login;