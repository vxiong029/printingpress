// react/redux imports
import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReadMoreButton from '../ReadMoreButton/ReadMoreButton';
// icon imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../ViewAllArticles/ViewAllArticles.css';

class ReadArticle extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_SUB_ARTICLES',
      payload: this.props.match.params.id,
    })
  }
  render() {
    console.log('this is', this.props.userArticles);
    
    return (
      <div id="container">
        <h1>Articles</h1>
        <div className="viewall-articles-feed">
        {this.props.userArticles.map(post => {
          return (
            <div
              key={post.id}
              className="viewall-articles"
            >
              <h3>{post.title}</h3>
                <img
                  className="img-sub"
                  alt=""
                  src={post.img_header}
                />
              <p>
                <FontAwesomeIcon
                  icon="calendar"
                />
                {' '}
                {post.date}
                {' '}
                {' '}
                <FontAwesomeIcon
                  icon="folder"
                />
                {' '}
                {post.name}
                <br />
                <FontAwesomeIcon
                  icon="user"
                />
                {' '}
                {' '}
                {post.full_name}
              </p>

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

const mapStateToProps = state => ({
  userArticles: state.userArticles,
  user: state.user,
})

export default connect(mapStateToProps)(ReadArticle);

