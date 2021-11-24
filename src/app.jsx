import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './components/ui/NavBar';
import Users from './layouts/users';
import Main from './layouts/main';
import Login from './layouts/login';

const links = [
  { path: '/', name: 'Main' },
  { path: '/login', name: 'Login' },
  { path: '/users', name: 'Users' }
];

function App() {
  return <BrowserRouter>
    <NavBar links={links} />
    <Switch>
      <Route path='/' exact component={Main}/>
      <Route path='/login/:type?' component={Login}/>
      <Route path='/users/:userId?/:type?' component={Users}/>
    </Switch>
  </BrowserRouter>;
}

export default App;
