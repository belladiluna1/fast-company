import React, { useState, useEffect } from 'react';
import api from '../api';
import PropTypes from 'prop-types';
import UserPageInfo from './UserPageInfo';

const UserPage = ({ id }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    api.users.getById(id).then((data) => setUser(data));
  }, []);

  return <>
    {user ? <UserPageInfo user={user} /> : <h1>Loading</h1>}
  </>;
};

UserPage.propTypes = {
  id: PropTypes.string
};

export default UserPage;
