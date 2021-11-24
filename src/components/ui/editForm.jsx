import React, { useEffect, useState } from 'react';
import TextField from '../common/form/TextField';
import { validator } from '../../utils/validator';
import api from '../../api';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const EditForm = ({ user }) => {
  const history = useHistory();

  const [data, setData] = useState({
    name: user.name,
    email: user.email,
    profession: user.profession,
    sex: user.sex,
    qualities: user.qualities.map(quality => (
      { label: quality.name, value: quality._id, color: quality.color }
    ))
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
    name: {
      isRequired: {
        message: 'Поле Имя обязательно для заполнения'
      }
    },
    email: {
      isRequired: {
        message: 'Поле Email обязательно для заполнения'
      },
      isEmail: {
        message: 'Email введен некорректно'
      }
    },
    profession: {
      isRequired: {
        message: 'Обязательно выберите Вашу профессию'
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
    data.qualities = data.qualities.map(quality => (
      { name: quality.label, _id: quality.value, color: quality.color }
    ));
    api.users.update(user._id, data).then(history.push(`/users/${user._id}`));
  };

  return <>
    <form onSubmit={handleSubmit}>
      <TextField label='Имя' value={data.name} name='name' onChange={handleChange} error={errors.name} />
      <TextField label='Электронная почта' value={data.email} name='email' onChange={handleChange} error={errors.email} />
      <SelectField label='Выберите Вашу профессию' value={data.profession.name} name='profession' onChange={handleChange} error={errors.profession} options={professions} defaultOption='Choose...' />
      <RadioField label='Выберите Ваш пол' value={data.sex} name='sex' onChange={handleChange} options={[
        { name: 'Male', value: 'male' },
        { name: 'Female', value: 'female' },
        { name: 'Other', value: 'other' }
      ]}/>
      <MultiSelectField options={qualities} selectedOptions={data.qualities} onChange={handleChange} name='qualities' label='Выберите Ваши качества' />
      <button type='submit' disabled={!isValid} className='btn btn-primary w-100 mx-auto'>Обновить</button>
    </form>
  </>;
};

EditForm.propTypes = {
  user: PropTypes.object.isRequired
};

export default EditForm;
