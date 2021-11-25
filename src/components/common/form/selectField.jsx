import React from 'react';
import PropTypes from 'prop-types';

const SelectField = ({ label, name, value, onChange, defaultOption, options, error }) => {
  const getInputClasses = () => {
    return 'form-select' + (error ? ' is-invalid' : '');
  };

  let optionsArray = [];
  if (!Array.isArray(options) && typeof options === 'object') {
    optionsArray = Object.keys(options).map(optionName => ({
      name: options[optionName].name,
      value: options[optionName]._id
    }));
  } else {
    optionsArray = options;
  }

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return <div className='mb-4'>
    <label htmlFor={name} className='form-label'>
      {label}
    </label>
    <select
      className={getInputClasses()}
      id={name}
      name={name}
      value={value}
      onChange={handleChange}>

      <option disabled value=''>{defaultOption}</option>
      {optionsArray && optionsArray.map((option, index) => (
        <option
          key={index}
          value={option.value}>
            {option.name}
        </option>
      ))}
    </select>
    {error && <div className='invalid-feedback'>
      {error}
    </div>}
  </div>;
};

SelectField.propTypes = {
  defaultOption: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default SelectField;
