import React from 'react';

const BookMark = ({_id, status, handleStatus}) => {

  return ( <button type="button" className="btn btn-secondary" onClick={() => handleStatus(_id)}>
      {!status && <i className={`bi bi-bookmark`} style={{fontSize: '2rem'}, {color: 'white'}} ></i>}
      {status && <i className={`bi bi-bookmark-fill`} style={{fontSize: '2rem'}, {color: 'white'}} ></i>}
    </button> );
}

export default BookMark;