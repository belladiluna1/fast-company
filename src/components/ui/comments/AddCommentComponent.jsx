import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { validator } from '../../../utils/validator';
import SelectField from '../../common/form/selectField';
import TextAreaField from '../../common/form/textAreaField';

const AddCommentComponent = ({ onAdd, users }) => {
  const params = useParams();
  const { userId } = params;
  const defaultState = {
    userId: userId,
    pageId: '',
    content: ''
  };
  const [errors, setErrors] = useState({});
  const [comment, setComment] = useState(defaultState);

  const validatorConfig = {
    pageId: {
      isRequired: {
        message: 'Выберите пользователя'
      }
    },
    content: {
      isRequired: {
        message: 'Введите комментарий'
      }
    }
  };

  const validate = () => {
    const errors = validator(comment, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleChange = (target) => {
    setComment((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onAdd(comment);
    setComment(defaultState);
  };

  const optionsForSelect = users.map(user => ({
    name: user.name,
    value: user._id
  }));

  return <div className="card-body">
    <form onSubmit={handleSubmit}>
      <h2>New comment</h2>
      <div className="mb-4">
        <SelectField label='' value={comment.pageId} name='pageId' onChange={handleChange} error={errors.pageId} options={optionsForSelect} defaultOption='Выберите пользователя' />
      </div>
      <div className="mb-4">
        <TextAreaField label='Сообщение' value={comment.content} name='content' onChange={handleChange} error={errors.content} />
      </div>
      <div className="mb-4">
        <button className="btn btn-primary" disabled={!isValid} type='submit'>Опубликовать</button>
      </div>
    </form>
  </div>;
};

AddCommentComponent.propTypes = {
  onAdd: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
};

export default AddCommentComponent;
