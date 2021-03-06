import React, { Component } from 'react';
import gradientbg from './gradientbg.svg';
import bluesquare from './bluesquare.svg';
import { Link } from 'react-router-dom';
import './Home.css';

// icon imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Home extends Component {
  render() {
    return (
      <div>
        <div className="event-wrapper">
          <img
            className="app-logo"
            src={gradientbg}
            alt="logo"
          />
          <img 
            className="bluesquare"
            src={bluesquare}
            alt="logo"
          />
        </div>
        <div id="home-container">
          {/* first category link */}
          {/* <ul className="category-one"> */}

          {/* </ul> */}
          {/* middle category links */}
          <ul className="category">
            <li>
              <Link className="category-link" to="/articles">
                <FontAwesomeIcon
                  icon="eye"
                  className="icons"
                />
                View All
                </Link>
            </li>
            <li>
              <Link className="category-link-blue" to="/articles">
                <FontAwesomeIcon
                  icon={['fab', 'css3-alt']}
                  className="icons"
                />
                CSS
                </Link>
            </li>
            <li>
              <Link className="category-link" to="/articles">
                <FontAwesomeIcon
                  icon={['fab', 'sketch']}
                  className="icons"
                />
                Design
                </Link>
            </li>
            <li>
              <Link className="category-link-blue" to="/articles">
                <FontAwesomeIcon
                  icon="code"
                  className="icons"
                />
                HTML
                </Link>
            </li>
            <li>
              <Link className="category-link" to="/articles">
                <FontAwesomeIcon
                  icon={['fab', 'js']}
                  size="1x"
                  className="icons"
                />
                Javascript
                </Link>
            </li>
            <li>
              <Link className="category-link-blue" to="/articles">
                <FontAwesomeIcon
                  icon="laptop-code"
                  className="icons"
                />
                jQuery
                </Link>
            </li>
            <li>
              <Link className="category-link" to="/articles">
                <FontAwesomeIcon
                  icon={['fab', 'react']}
                  className="icons"
                />
                React
                </Link>
            </li>
            <li>
              <Link className="category-link" to="/articles">
                <FontAwesomeIcon
                  icon="project-diagram"
                  className="icons"
                />
                Tech
                </Link>
            </li>
          </ul>
          {/* last category link */}
          {/* <ul className="category-last">
            
          </ul> */}
        </div>
      </div>
    )
  }
}

export default Home;