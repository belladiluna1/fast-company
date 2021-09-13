import React, { useEffect, useState } from 'react';
import { paginate } from '../utils/paginate';
import Pagination from './pagination';
import User from './user';
import api from '../api';
import PropTypes from 'prop-types';
import GroupList from './groupList';
import SearchStatus from './searchStatus';

const Users = ({ users: allUsers, ...rest }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();

  const pageSize = 4;

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleProfessionSelect = item => {
    setSelectedProf(item);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const filteredUsers = selectedProf ? allUsers.filter((user) => user.profession._id === selectedProf._id) : allUsers;

  const count = filteredUsers.length;

  const users = paginate(filteredUsers, currentPage, pageSize);

  const clearFilter = () => {
    setSelectedProf();
  };

  return (<>
    <SearchStatus count={count} />
    <div className='d-flex'>

      {professions && <div className='d-flex flex-column flex-shrink-0 p-3'>
        <GroupList
        selectedItem={selectedProf}
        items={professions}
        onItemSelect={handleProfessionSelect} />
        <button onClick={clearFilter} className='btn btn-secondary mt-2'>Очистить</button>
      </div>}

      {count > 0 && <div className='d-flex flex-column'>
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
        <div className='d-flex justify-content-center'>
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </div>
        </div>}
      </div>
    </>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  rest: PropTypes.array
};

export default Users;
