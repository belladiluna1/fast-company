import React from 'react';
import PropTypes from 'prop-types';

const TextAreaField = ({ label, value, name, onChange, error }) => {
  const getInputClasses = () => {
    return 'form-control' + (error ? ' is-invalid' : '');
  };
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return <>
    <label htmlFor={name} className="form-label">{label}</label>
    <textarea className={getInputClasses()} id={name} rows="3" onChange={handleChange} name={name} value={value}></textarea>
    {error && <div className='invalid-feedback'>{error}</div>}
  </>;
};

TextAreaField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
};

export default TextAreaField;
