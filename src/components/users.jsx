import React, {useState} from 'react';
import api from '../api';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handeDelete = (userId) => {
    setUsers(users.filter(function(item) { 
      return item._id !== userId;
    }))
  }
  const renderPhrase = (number) => {
    let classes = "badge m-2 bg-";
    classes += number === 0 ? "danger" : "primary";
    let phrase = "Никто с тобой не тусанет";
    if (number > 1 && number < 5) phrase = `${number} человекa тусанет с тобой сегодня`;
    else if (number === 1 || number > 4) phrase = `${number} человек тусанет с тобой сегодня`;
  
    return <span style={{fontSize: 16}} className={classes}>{phrase}</span>;
  }
  return <>
    {renderPhrase(users.length)}

    {users.length > 0 && <table className="table">
      <thead>
        <tr>
          <th scope="col">Имя</th>
          <th scope="col">Качества</th>
          <th scope="col">Профессия</th>
          <th scope="col">Встретился, раз</th>
          <th scope="col">Оценка</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => {
          return <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.qualities.map(quality => {
              return <span key={quality._id} className={`badge m-1 bg-${quality.color}`}>{quality.name}</span>;
            })}</td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}/5</td>
            <td><button className="btn btn-danger" onClick={() => handeDelete(user._id)}>Delete</button></td>
          </tr>
        })}
        
      </tbody>
    </table>}
  </>;
}
 
export default Users;