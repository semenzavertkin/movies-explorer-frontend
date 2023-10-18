import Form from '../Form/Form';
import Input from '../Input/Input';
import useValidation from '../../hooks/useValidation';

function Register(props) {
  const { values, errors, handleChange, isValid, setIsValid } = useValidation({ name: '', email: '', password: '' });
  function handleSubmit(e) {
    setIsValid(false);
    e.preventDefault();
    props.onRegister(values.name, values.email, values.password);
  }

  return (
    <main className="register">
      <Form
        title="Добро пожаловать!"
        submit="Зарегистрироваться"
        question="Уже зарегистрированы?"
        link="Войти"
        path="/signin"
        onSubmit={handleSubmit}
        isValid={isValid}
      >
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Ваше имя..."
          required
          minLength={2}
          maxLength={40}
          errors={errors.name || ''}
          value={values.name || ''}
          onChange={handleChange}
        />

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

export default Register;