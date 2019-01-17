import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import ArticleNav from '../Nav/ArticleNav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import Home from '../Home/Home';
import UserPage from '../UserPage/UserPage';
import CreatePost from '../CreatePost/CreatePost';
import ViewAllArticles from '../ViewAllArticles/ViewAllArticles';
import ReadArticle from '../ReadArticle/ReadArticle';

import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

library.add(faCalendar);

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
  }
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <ArticleNav />
          <Switch>
            {/* Printing Press Home page */}
            <Route
              exact
              path="/"
              component={Home}
            />
            <Route 
              exact
              path="/articles"
              component={ViewAllArticles}
            />
            <Route 
              exact
              path="/articles/:id"
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
