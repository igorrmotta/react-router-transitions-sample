import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import logo from '../logo.svg';

const Menu = withRouter(props => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <nav style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Link to="/home"> Home </Link>
        <Link to="/profile"> Profile </Link>
        <Link to="/about"> About </Link>
      </nav>
    </header>
  );
});

export { Menu };
