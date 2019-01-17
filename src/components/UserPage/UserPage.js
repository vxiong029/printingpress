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
      <div>
        <div id="bg"></div>
        <div id="container">
          <h1>Hello, {this.props.user.full_name}!</h1>
          <p>
            <FontAwesomeIcon
              icon="calendar"
              color="#7f7f7f"
            />
            {' '}
            {new Date().toLocaleString()}
          </p>
          {/* <div id="user-profile">
          
          <img
            id="user-img"
            src={this.props.user.img_avatar}
            alt={this.props.user.username}
          />
          <p>
            <Link className="user-link" to="/myArticles">
              View My Articles
            </Link> 
          </p>
        </div> */}
          <div id="sub-container">
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
                    <h3>{userBlog.full_name}</h3>
                    <p>{userBlog.description}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <h1>My Articles</h1>

          <div id="article-feed">
            {this.props.blog.map(post => {
              return (
                <div
                  key={post.id}
                  className="articles"
                >
                  <DeleteArticleButton
                    postId={post.id}
                  />
                  <h2>{post.title}</h2>
                  <p>
                    <img
                      className="img-art"
                      alt=""
                      src={post.img_header}
                    />
                  </p>
                  <p>{post.date}</p>
                  <p>Category: {post.name}</p>

                  <ReadMoreButton
                    postId={post.id}
                  />

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
