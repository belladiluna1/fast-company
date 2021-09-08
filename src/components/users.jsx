import React from 'react';
import User from './user';

const Users = ({users, currentPage, countOnPage, ...rest}) => {
  return users.length > 0 && <table className="table">
      <thead>
        <tr>
          <th scope="col">Имя</th>
          <th scope="col">Качества</th>
          <th scope="col">Профессия</th>
          <th scope="col">Встретился, раз</th>
          <th scope="col">Оценка</th>
          <th scope="col">Избранное</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => {
          if ((index >= currentPage * countOnPage) && (index < (currentPage + 1) * countOnPage)) return <User {...user} {...rest} key={user._id} />
        })}
        
      </tbody>
    </table>;
}

export default Users;