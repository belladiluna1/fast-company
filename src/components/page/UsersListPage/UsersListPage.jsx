import React, { useEffect, useState } from 'react';
import { paginate } from '../../../utils/paginate';
import Pagination from '../../common/pagination';
import api from '../../../api';
import SearchStatus from '../../ui/searchStatus';
import UsersTable from '../../ui/UsersTable';
import GroupList from '../../common/groupList';
import _ from 'lodash';

const UsersListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
  const [allUsers, setAllUsers] = useState();
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    api.users.fetchAll().then((data) => {
      const u = data.map((user) => {
        return { ...user, status: false };
      });
      setAllUsers(u);
    });
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

  if (!allUsers) return <>Loading...</>;

  let filteredUsers = allUsers;
  if (selectedProf) filteredUsers = filteredUsers.filter((user) => user.profession._id === selectedProf._id);
  if (searchString) filteredUsers = filteredUsers.filter((item) => item.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);

  const count = filteredUsers.length;
  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
  const users = paginate(sortedUsers, currentPage, pageSize);

  const clearFilter = () => {
    setSelectedProf();
  };

  const handleSearchString = ({ target }) => {
    setSearchString(target.value);
    setCurrentPage(1);
  };

  return (<>
    <div className='d-flex'>

      {professions && <div className='d-flex flex-column flex-shrink-0 p-3'>
        <GroupList
        selectedItem={selectedProf}
        items={professions}
        onItemSelect={handleProfessionSelect} />
        <button onClick={clearFilter} className='btn btn-secondary mt-2'>Очистить</button>
      </div>}

      <div className='d-flex flex-column'>
        <SearchStatus count={count} />

        <input type='text' placeholder='Search...' className='m-2' onInput={handleSearchString} value={searchString} />

        {count > 0 && <><UsersTable users={users} onSort={setSortBy} selectedSort={sortBy} {...{ handleStatus, handleDelete }} />
          <div className='d-flex justify-content-center'>
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>
          </>}
        </div>
      </div>
    </>
  );
};

export default UsersListPage;
