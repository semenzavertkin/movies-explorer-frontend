import './Input.css'

const Input = (props) => {
  return (
    <label className="input">
      <p className="input__title">{props.title}</p>
      <input
        id={props.name}
        name={props.name}
        type={props.type}
        className={`input__field ${props.errors !== '' && "input__field_error"}`}
        placeholder={props.placeholder}
        {...props}
      />
      <span className={`input__error input__error_${props.name}`}>{props.errors}</span>
    </label>
  );
};

export default Input