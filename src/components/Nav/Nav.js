import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import logo from './logo.svg';

import './Nav.css';


const Nav = (props) => (
  <div className="nav">
    <Link 
      className="nav-logo"
      to="/">
      <span>
        <img 
          src={logo}
          className="logo-img"
          alt="logo"
        />
      </span>
      <span className="nav-title">Printing Press</span>
    </Link>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
