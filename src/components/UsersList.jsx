import React, { useEffect, useState } from 'react';
import { paginate } from '../utils/paginate';
import Pagination from '../components/pagination';
import api from '../api';
import GroupList from '../components/groupList';
import SearchStatus from '../components/searchStatus';
import UsersTable from '../components/UsersTable';
import _ from 'lodash';

const UsersList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
  const [allUsers, setAllUsers] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) => setAllUsers(
      data.map((user) => {
        return { ...user, status: false };
      })
    ));
  }, []);

  const handleStatus = (userId) => {
    setAllUsers(
      allUsers.map((item) => {
        if (item._id === userId) return { ...item, status: !item.status };
        return item;
      })
    );
  };

  const handleDelete = (userId) => {
    setAllUsers(
      allUsers.filter(function (item) {
        return item._id !== userId;
      })
    );
  };

  const pageSize = 7;

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

  if (allUsers) {
    const filteredUsers = selectedProf ? allUsers.filter((user) => user.profession._id === selectedProf._id) : allUsers;

    const count = filteredUsers.length;

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

    const users = paginate(sortedUsers, currentPage, pageSize);

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
          <UsersTable users={users} onSort={setSortBy} selectedSort={sortBy} {...{ handleStatus, handleDelete }} />
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
  } else {
    return <>Loading...</>;
  }
};

export default UsersList;
