import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import UserNav from '../Nav/UserNav';
import ArticleNav from '../Nav/ArticleNav';
import UserPageNav from '../UserPage/UserPageNav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import Home from '../Home/Home';
import UserPage from '../UserPage/UserPage';
import CreatePost from '../CreatePost/CreatePost';
import ViewAllArticles from '../ViewAllArticles/ViewAllArticles';
import ReadArticle from '../ReadArticle/ReadArticle';
import UserArticles from '../UserArticles/UserArticles';

import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCalendar, 
  faCode, 
  faLaptopCode,
  faProjectDiagram,
  faEye,
  faHome,
  faPencilAlt,
  faCopy,
  faUsers,
  faTrash,
  faFolder,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { 
  faCss3Alt,
  faSketch,
  faJs,
  faReact,
} from '@fortawesome/free-brands-svg-icons';

library.add(fab, 
  faCalendar, 
  faCss3Alt, 
  faSketch, 
  faCode,
  faJs,
  faLaptopCode,
  faReact,
  faProjectDiagram,
  faEye,
  faHome,
  faPencilAlt,
  faCopy,
  faUsers,
  faTrash,
  faFolder,
  faUser
);

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
  }
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <UserNav />
          <ArticleNav />
          {this.props.user.id &&
            (
              <UserPageNav />
            )
          }
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
            <Route
              exact
              path="/articles/user/:id"
              component={UserArticles}
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
