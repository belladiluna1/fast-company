import React from 'react';
import BookMark from './bookmark';
import Quality from './quality';
import PropTypes from 'prop-types';

const User = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  status,
  handleStatus,
  handeDelete
}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>
        {qualities.map((quality) => {
          return <Quality {...quality} key={quality._id} />;
        })}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}/5</td>
      <td>
        <BookMark _id={_id} status={status} handleStatus={handleStatus} />
      </td>
      <td>
        <button className='btn btn-danger' onClick={() => handeDelete(_id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

User.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  qualities: PropTypes.array.isRequired,
  profession: PropTypes.object.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  status: PropTypes.bool.isRequired,
  handleStatus: PropTypes.func.isRequired,
  handeDelete: PropTypes.func.isRequired
};

export default User;
