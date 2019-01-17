// react/redux imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
// component imports
import LogOutButton from '../LogOutButton/LogOutButton';
import DeleteArticleButton from '../DeleteArticleButton/DeleteArticleButton';
import UnfollowButton from '../UnfollowButton/UnfollowButton';
import ReadMoreButton from '../ReadMoreButton/ReadMoreButton';

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
        <div>
          <h1 id="welcome">
            Welcome, {this.props.user.full_name}!
          </h1>
          <img
            src={this.props.user.img_avatar}
            alt={this.props.user.username}
          />
          <p>Your ID is: {this.props.user.id}</p>
          <LogOutButton className="log-in" />
        </div>
        <div>
          <h1>My Subscription Feed</h1>
          {this.props.subscription.map(userBlog => {
            return (
              <div key={userBlog.id}>
                <h3>{userBlog.full_name}</h3>
                <img
                  src={userBlog.img_avatar}
                  alt={userBlog.img_avatar}
                />
                <p>{userBlog.description}</p>
                <UnfollowButton
                  blogId={userBlog.sub_blog_id}
                />
              </div>
            )
          })}
        </div>
        <div>
          <h1>My Articles</h1>
          {this.props.blog.map(post => {
            return (
              <div key={post.id}>
                <h2>{post.title}</h2>
                <DeleteArticleButton
                  postId={post.id}
                />
                <p>
                  <img
                    alt=""
                    src={post.img_header}
                    width="100"
                    height="100"
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
