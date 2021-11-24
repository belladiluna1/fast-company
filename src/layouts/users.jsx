import React from 'react';
import { useParams } from 'react-router-dom';
import UserPage from '../components/page/UserPage';
import UserPageEdit from '../components/page/UserPageEdit/UserPageEdit';
import UsersListPage from '../components/page/UsersListPage';

const Users = () => {
  const params = useParams();
  const { userId, type } = params;
  return <>
    {userId ? (type ? <UserPageEdit id={userId} /> : <UserPage id={userId} />) : <UsersListPage />}
  </>;
};

export default Users;
