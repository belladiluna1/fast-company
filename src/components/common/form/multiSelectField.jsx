import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const MultiSelectField = ({ options, onChange, name, label, selectedOptions }) => {
  let optionsArray = [];
  if (!Array.isArray(options) && typeof options === 'object') {
    optionsArray = Object.keys(options).map(optionName => ({
      label: options[optionName].name,
      value: options[optionName]._id,
      color: options[optionName].color || undefined
    }));
  } else {
    optionsArray = options;
  }

  const handleChange = (value) => {
    onChange({ name: name, value });
  };

  return <div className='mb-4'>
    <label className='form-label'>
      {label}
    </label>
    <Select
      isMulti
      defaultValue={selectedOptions}
      closeMenuOnSelect={false}
      options={optionsArray}
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={handleChange}
      name={name} />
    </div>;
};

MultiSelectField.defaultValue = {
  selectedOptions: []
};

MultiSelectField.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  name: PropTypes.string,
  label: PropTypes.string,
  selectedOptions: PropTypes.array
};

export default MultiSelectField;
