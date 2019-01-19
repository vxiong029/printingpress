// react/redux imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
// component imports
import LogOutButton from '../LogOutButton/LogOutButton';
import DeleteArticleButton from '../DeleteArticleButton/DeleteArticleButton';
import UnfollowButton from '../UnfollowButton/UnfollowButton';
import ReadMoreButton from '../ReadMoreButton/ReadMoreButton';

import { Link } from 'react-router-dom';
import './Userpage.css';

// icon imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class UserPage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_SUBSCRIPTION_FEED',
    })
    this.props.dispatch({
      type: 'GET_USER_ARTICLES',
    })
  }
  // edit button handle click
  handleEdit = (id) => {
    console.log('in handle edit', id);

    this.props.dispatch({
      type: 'EDIT_ARTICLE',
      payload: id
    })
  }
  render() {
    return (
      <div id="container">
        <h1>Hello, {this.props.user.full_name}!</h1>
        <FontAwesomeIcon
          icon="calendar"
        />
        {' '}
        {new Date().toLocaleString()}
        <div>
          <h2>Subscription Feed</h2>
          <div id="subscription-feed">
            {this.props.subscription.map(userBlog => {
              return (
                <div
                  key={userBlog.id}
                  className="subscriptions"
                >

                  <span className="delete-button">
                    <UnfollowButton
                      blogId={userBlog.sub_blog_id}
                    />
                  </span>

                  <div className="img-sub-container">
                    <img
                      className="img-sub"
                      src={userBlog.img_avatar}
                      alt={userBlog.img_avatar}
                    />
                  </div>

                  <Link
                    className="username"
                    to={`/articles/user/${userBlog.sub_blog_id}`}>
                    <span>{userBlog.full_name}</span>
                  </Link>
                  <p>{userBlog.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
  subscription: state.subscription,
  blog: state.blog,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
