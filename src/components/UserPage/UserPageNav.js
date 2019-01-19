import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

// icon imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class UserPageNav extends Component {
  render() {
    return (
      <div>
        <div id="dashboard-nav">
          <ul className="dashboard-nav-ul">
            <li>
              <Link to="/user">
                <FontAwesomeIcon
                  icon="home"
                  className="icons"
                />
                Dashboard
                </Link>
            </li>
            <li>
              <Link to="/createPost">
                <FontAwesomeIcon
                  icon="pencil-alt"
                  className="icons"
                />
                Write an Article
                </Link>
            </li>
            <li>
              <Link to="/user">
                <FontAwesomeIcon
                  icon="copy"
                  className="icons"
                />
                My Articles
                </Link>
            </li>
            <li>
              <Link to="/user">
                <FontAwesomeIcon
                  icon="users"
                  className="icons"
                />
                Subscriptions
                </Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

// const UserPageNav = (props) => (

// );

export default withRouter(UserPageNav);
