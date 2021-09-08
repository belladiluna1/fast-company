import React, { useEffect, useState } from 'react';
import Users from './components/users';
import api from './api';
import SearchStatus from './components/searchStatus';
import Pagination from './components/pagination';

const countOnPage = 5;

function App() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const usersFromServer = api.users.fetchAll();
    setUsers(usersFromServer.map(user => {
      return {...user, status: false};
    }));
  }, []);

  const handleStatus = (userId) => {
    setUsers(users.map(item => {
      if (item._id === userId) return {...item, status: !item.status};
      return item;
    }));
  }
  const handeDelete = (userId) => {
    setUsers(users.filter(function(item) { 
      return item._id !== userId;
    }))
  }
  const renderPhrase = (number) => {
    let classes = "badge m-2 bg-";
    classes += number === 0 ? "danger" : "primary";
    let phrase = "Никто с тобой не тусанет";
    if ((number % 100 < 10 || number % 100 > 20) && number % 10 > 1 && number % 10 < 5) phrase = `${number} человекa тусанет с тобой сегодня`;
    else if ((number % 100 >= 10 && number % 100 <= 20) || number % 10 === 0 || number % 10 === 1 || number % 10 > 4) phrase = `${number} человек тусанет с тобой сегодня`;
  
    return <span style={{fontSize: 16}} className={classes}>{phrase}</span>;
  }
  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  }

  return (
    <div className="col-lg-8 mx-auto p-3 py-md-5">
      <main>
        <SearchStatus renderPhrase={renderPhrase} users={users} />
        <Users currentPage={currentPage} countOnPage={countOnPage} handeDelete={handeDelete} renderPhrase={renderPhrase} handleStatus={handleStatus} users={users}  />
        <Pagination users={users} countOnPage={countOnPage} currentPage={currentPage} handleCurrentPage={handleCurrentPage} />
      </main>
    </div>
  );
}

export default App;