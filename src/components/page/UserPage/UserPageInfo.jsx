import React from 'react';
import PropTypes from 'prop-types';
import QualitiesList from '../../ui/qualities/QualitiesList';
import { useHistory } from 'react-router-dom';

const UserPageInfo = ({ user }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`${user._id}/edit`);
  };

  return <>
    <h1>{user.name}</h1>
    <h2>Профессия: {user.profession.name}</h2>
    <p>
      <QualitiesList qualities={user.qualities}/>
    </p>
    <p>
      completedMeetings: {user.completedMeetings}
    </p>
    <h2>Rate: {user.rate}</h2>
    <button onClick={() => handleClick()}>Редактировать</button>
  </>;
};

UserPageInfo.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserPageInfo;
