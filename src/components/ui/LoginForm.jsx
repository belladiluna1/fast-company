import React, { useEffect, useState } from 'react';
import TextField from '../common/form/TextField';
import { validator } from '../../utils/validator';
import CheckboxField from '../common/form/checkboxField';

const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '', stayOn: false });
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Поле Email обязательно для заполнения'
      },
      isEmail: {
        message: 'Email введен некорректно'
      }
    },
    password: {
      isRequired: {
        message: 'Поле Пароль обязательно для заполнения'
      },
      isCapitalSymbol: {
        message: 'Пароль должен содержать хотя бы одну заглавную букву'
      },
      isContainDigit: {
        message: 'Пароль должен содержать хотя бы одну цифру'
      },
      min: {
        message: 'Пароль должен состоять минимум из 8 символов',
        value: 8
      }
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(e);
  };

  return <>
    <form onSubmit={handleSubmit}>
      <TextField label='Электронная почта' value={data.email} name='email' onChange={handleChange} error={errors.email} />
      <TextField label='Пароль' type='password' value={data.password} name='password' onChange={handleChange} error={errors.password} />
      <CheckboxField value={data.stayOn} onChange={handleChange} name='stayOn'>
        Оставаться в системе
      </CheckboxField>
      <button type='submit' disabled={!isValid} className='btn btn-primary w-100 mx-auto'>Submit</button>
    </form>
  </>;
};

export default LoginForm;
