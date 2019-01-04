import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

const Nav = (props) => (
  <div className="nav">
    <Link to="/">
      <h2 className="nav-title">Prime Solo Project</h2>
    </Link>
    <div className="nav-right">
      <Link className="nav-link" to="/user">
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.user.id ? 'User Home' : 'Login / Register'}
      </Link>
      <Link className="nav-link" to="/articles">
        View Printing Press Articles
      </Link>
      {props.user.id && (
        <>
          <Link className="nav-link" to="/createPost">
            Create New Post
          </Link>
          <LogOutButton className="nav-link" />
        </>
      )}
    </div>
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
