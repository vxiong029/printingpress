import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import Home from '../Home/Home';
import UserPage from '../UserPage/UserPage';
import CreatePost from '../CreatePost/CreatePost';
import ViewAllArticles from '../ViewAllArticles/ViewAllArticles';

import './App.css';
import ReadArticle from '../ReadArticle/ReadArticle';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
  }
  // loadSubscriptionFeed() {
  //   this.props.dispatch({
  //     type: 'GET_SUBSCRIPTION_FEED',
  //     payload: this.props.user.id
  //   })
  // }
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Printing Press Home page */}
            <Route
              exact
              path="/"
              component={Home}
            />
            <Route 
              path="/articles"
              component={ViewAllArticles}
            />
            <Route 
              path="/readArticle"
              component={ReadArticle}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/user"
              component={UserPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/createPost"
              component={CreatePost}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(App);
