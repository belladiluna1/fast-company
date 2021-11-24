import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavBar = ({ links }) => {
  return <ul className="nav">
    {links.map((link) => <li key={link.name} className="nav-item">
      <Link to={link.path} className="nav-link">{link.name}</Link>
    </li>)}
  </ul>;
};

NavBar.propTypes = {
  links: PropTypes.array.isRequired
};

export default NavBar;
