import { useEffect, useState } from 'react';
import isEmail from 'validator/es/lib/isEmail';

function useValidation(keys) {
  const [values, setValues] = useState(keys);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(e) {
    const target = e.target;
    const { name, value } = target;

    setValues((values) => ({ ...values, [name]: value }));
    setErrors((errors) => ({ ...errors, [name]: target.validationMessage }));
    setIsValid(target.closest('form').checkValidity());
  
    if (name === 'email') {
      if (!isEmail(value)) {
        target.setCustomValidity('Некорректый адрес почты.');
      } else {
        target.setCustomValidity('');
      }
    }
  }


  function defaultValues(values = {}, errors = {}) {
    setValues(values);
    setErrors(errors);
  }

  useEffect(() => {
    const isEmpty = Object.values(values).some((value) => value === '');
    if (isEmpty) {
      setIsValid(false);
    }
  }, [values]);

  return { values, errors, handleChange, defaultValues, isValid, setValues, setIsValid };
}

export default useValidation;
