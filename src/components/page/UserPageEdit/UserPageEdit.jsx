import React, { useState, useEffect } from 'react';
import api from '../../../api';
import PropTypes from 'prop-types';
import UserPageEditInfo from './UserPageEditInfo';

const UserPageEdit = ({ id }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    api.users.getById(id).then((data) => setUser(data));
  }, []);

  return <>
    {user ? <UserPageEditInfo user={user} /> : <h1>Loading</h1>}
  </>;
};

UserPageEdit.propTypes = {
  id: PropTypes.string
};

export default UserPageEdit;
