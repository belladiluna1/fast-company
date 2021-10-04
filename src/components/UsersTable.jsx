import React from 'react';
import PropTypes from 'prop-types';
import BookMark from './bookmark';
import QualitiesList from './QualitiesList';
import Table from './Table';

const UsersTable = ({ users, onSort, selectedSort, handleStatus, handleDelete }) => {
  const columns = {
    name: { path: 'name', name: 'Имя' },
    qualities: { name: 'Качества', component: (user) => <QualitiesList qualities={user.qualities}/> },
    professions: { path: 'profession.name', name: 'Профессия' },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    status: { path: 'status', name: 'Избранное', component: (user) => <BookMark _id={user._id} status={user.status} handleStatus={handleStatus} /> },
    delete: { component: (user) => <button className='btn btn-danger' onClick={() => handleDelete(user._id)}>Delete</button> }
  };

  return <Table {...{ onSort, selectedSort, columns, data: users }} />;
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  handleStatus: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default UsersTable;
