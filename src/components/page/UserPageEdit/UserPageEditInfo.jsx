import React from 'react';
import EditForm from '../../ui/editForm';
import PropTypes from 'prop-types';

const UserPageEditInfo = ({ user }) => {
  return <>
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-12 shadow p-4'>
          <EditForm user={user} />
        </div>
      </div>
    </div>
  </>;
};

UserPageEditInfo.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserPageEditInfo;
