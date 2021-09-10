import React, { useState } from 'react';
import { paginate } from '../utils/paginate';
import Pagination from './pagination';
import User from './user';
import PropTypes from 'prop-types';

const Users = ({ users: allUsers, ...rest }) => {
  const count = allUsers.length;
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const users = paginate(allUsers, currentPage, pageSize);

  return (
    count > 0 && (
      <>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Имя</th>
              <th scope='col'>Качества</th>
              <th scope='col'>Профессия</th>
              <th scope='col'>Встретился, раз</th>
              <th scope='col'>Оценка</th>
              <th scope='col'>Избранное</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return <User {...user} {...rest} key={user._id} />;
            })}
          </tbody>
        </table>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </>
    )
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  rest: PropTypes.array
};

export default Users;
