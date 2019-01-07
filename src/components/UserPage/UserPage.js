import React, {Component} from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';

class UserPage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_SUBSCRIPTION_FEED',
      payload: this.props.user.id
    })
  }
  // unfollow button handleclick
  handleUnfollow = (id) => {
    this.props.dispatch({
      type: 'UNFOLLOW_USER',
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
          <h1>Subscription Feed</h1>
          {this.props.subscription.map(blog => {
            return (
              <div key={blog.id}>
                <h3>{blog.full_name}</h3>
                <p>{blog.description}</p>
                <button onClick={() => this.handleUnfollow(blog.sub_blog_id)}>Unfollow</button>
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
  subscription: state.subscription
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
