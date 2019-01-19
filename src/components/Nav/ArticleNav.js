import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Nav.css';

const ArticleNav = () => (
  <div className="nav-articles">
    <Link className="nav-article-link" to="/articles">
      VIEW ALL
    </Link>
    <Link className="nav-article-link" to="/articles">
      CSS
    </Link>
    <Link className="nav-article-link" to="/articles">
      DESIGN
    </Link>
    <Link className="nav-article-link" to="/articles">
      HTML
    </Link>
    <Link className="nav-article-link" to="/articles">
      JAVASCRIPT
    </Link>
    <Link className="nav-article-link" to="/articles">
      JQUERY
    </Link>
    <Link className="nav-article-link" to="/articles">
      REACT
    </Link>
    <Link className="nav-article-link" to="/articles">
      TECH
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

export default connect(mapStateToProps)(ArticleNav);
