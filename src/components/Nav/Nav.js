import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

const Nav = (props) => (
  <div className="nav">
    <Link to="/">
      <h2 className="nav-title">Printing Press</h2>
    </Link>
    <div className="nav-right">
      <Link className="nav-link" to="/user">
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.user.id ?
          <>
            <span className="username">Home</span>
            <img
              className="img-nav"
              src={props.user.img_avatar}
              alt="avatar"
            />
          </>
          : 'Login / Register'
        }
      </Link>
      {props.user.id && (
        <>
          <Link className="nav-link" to="/createPost">
            Create New Post
          </Link>
          <LogOutButton className="nav-link" />
        </>
      )}
      {/* <Link className="nav-link" to="/articles">
        View Printing Press Articles
      </Link> */}
    </div>
    <div className="nav-articles">
      <Link className="nav-link" to="/articles">
        View All Articles
      </Link>
      <Link className="nav-link" to="/articles">
        Tech
      </Link>
      <Link className="nav-link" to="/articles">
        React
      </Link>
      <Link className="nav-link" to="/articles">
        HTML
      </Link>
      <Link className="nav-link" to="/articles">
        Javascript
      </Link>
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
