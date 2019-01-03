import React, { Component } from 'react';
import { connect } from 'react-redux';

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    img_avatar: '',
    blog_title: '',
    is_featured: 'false'
  }

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          img_avatar: this.state.img_avatar,
          blog_title: this.state.blog_title,
          is_featured: this.state.is_featured
        },
      });
    } else {
      this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <p>
          {JSON.stringify(this.state)}
        </p>
        <form onSubmit={this.registerUser}>
          <h1>Register User</h1>
          <div>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="email">
              Email:
              <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChangeFor('email')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="img_avatar">
              Avatar Image URL:
              <input
                type="text"
                name="img_avatar"
                value={this.state.img_avatar}
                onChange={this.handleInputChangeFor('img_avatar')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="blog_title">
              Blog Title:
              <input
                type="text"
                name="blog_title"
                value={this.state.blog_title}
                onChange={this.handleInputChangeFor('blog_title')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="is_featured">
              Feature Your Blog?:
              <input
                type="radio"
                name="is_featured"
                value="true"
                checked={this.state.is_featured === 'true'}
                onChange={this.handleInputChangeFor('is_featured')}
              /> Yes
              <input
                type="radio"
                name="is_featured"
                value="false"
                checked={this.state.is_featured === 'false'}
                onChange={this.handleInputChangeFor('is_featured')}
              /> No
            </label>
          </div>
          <div>
            <input
              className="register"
              type="submit"
              name="submit"
              value="Register"
            />
          </div>
        </form>
        <center>
          <button
            type="button"
            className="link-button"
            onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}
          >
            Login
          </button>
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);

