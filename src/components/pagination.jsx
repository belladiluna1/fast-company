import React from 'react';

const Pagination = ({ users, countOnPage, currentPage, handleCurrentPage }) => {

  const pages = Array(Math.ceil(users.length / countOnPage)).fill(null);

  return users.length > 0 && <ul className="pagination">
            {/* <li className="page-item disabled">
              <a className="page-link">Previous</a>
            </li> */}

            {pages.map((_page, index) => {
              if (index === currentPage) return <li className="page-item active" aria-current="page">
                <a className="page-link" >{index + 1}</a>
              </li>;
              else return <li onClick={() => handleCurrentPage(index)} className="page-item"><a className="page-link" >{index + 1}</a></li>
            })}

            {/* <li className="page-item">
              <a className="page-link" href="#">Next</a>
            </li> */}
          </ul>;
}

export default Pagination;