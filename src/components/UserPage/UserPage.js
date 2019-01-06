import React, {Component} from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class UserPage extends Component {
  render() {
    return (
      <div>
        <h1 id="welcome">
          Welcome, {this.props.user.full_name}!
        </h1>
        <img
          src={this.props.user.img_avatar}
          alt={this.props.user.username}
        ></img>
        <p>Your ID is: {this.props.user.id}</p>

        <LogOutButton className="log-in" />
      </div>
    )
  }
}
// const UserPage = (props) => (
  
// );

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
