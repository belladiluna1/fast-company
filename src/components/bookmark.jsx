import React from 'react';
import PropTypes from 'prop-types';

const BookMark = ({ _id, status, handleStatus }) => {
  return (
    <button
      type='button'
      className='btn btn-secondary'
      onClick={() => handleStatus(_id)}
    >
      {!status && <i
        className={'bi bi-bookmark'}
        style={{ fontSize: '1rem', color: 'white' }}
      ></i>}
      {status && <i
        className={'bi bi-bookmark-fill'}
        style={{ fontSize: '1rem', color: 'white' }}
      ></i>}
    </button>
  );
};

BookMark.propTypes = {
  _id: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  handleStatus: PropTypes.func.isRequired
};

export default BookMark;
