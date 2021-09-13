import React, { useEffect, useState } from 'react';
import Users from './components/users';
import api from './api';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(
      data.map((user) => {
        return { ...user, status: false };
      })
    ));
  }, []);

  const handleStatus = (userId) => {
    setUsers(
      users.map((item) => {
        if (item._id === userId) return { ...item, status: !item.status };
        return item;
      })
    );
  };

  const handeDelete = (userId) => {
    setUsers(
      users.filter(function (item) {
        return item._id !== userId;
      })
    );
  };

  return (
    <div className='col-lg-10 mx-auto py-md-5'>
      <main>
        <Users
          handeDelete={handeDelete}
          handleStatus={handleStatus}
          users={users}
        />
      </main>
    </div>
  );
}

export default App;
