import React, { useEffect, useState } from 'react';
import TextField from '../common/form/TextField';
import { validator } from '../../utils/validator';
import api from '../../api';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import CheckboxField from '../common/form/checkboxField';

const RegisterForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    license: false
  });
  const [errors, setErrors] = useState({});
  const [professions, setProfessions] = useState();
  const [qualities, setQualities] = useState({});

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
    api.qualities.fetchAll().then((data) => setQualities(data));
  }, []);

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
    },
    profession: {
      isRequired: {
        message: 'Обязательно выберите Вашу профессию'
      }
    },
    license: {
      isRequired: {
        message: 'Вы не можете использовать наш сервис без подтверждения лицензионного соглашения'
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
      <SelectField label='Выберите Вашу профессию' value={data.profession} name='profession' onChange={handleChange} error={errors.profession} options={professions} defaultOption='Choose...' />
      <RadioField label='Выберите Ваш пол' value={data.sex} name='sex' onChange={handleChange} options={[
        { name: 'Male', value: 'male' },
        { name: 'Female', value: 'female' },
        { name: 'Other', value: 'other' }
      ]}/>
      <MultiSelectField options={qualities} onChange={handleChange} name='qualities' label='Выберите Ваши качества' />
      <CheckboxField value={data.license} onChange={handleChange} name='license' error={errors.license}>
        Подтвердить <a>лицензионное соглашение</a>
      </CheckboxField>
      <button type='submit' disabled={!isValid} className='btn btn-primary w-100 mx-auto'>Submit</button>
    </form>
  </>;
};

export default RegisterForm;
