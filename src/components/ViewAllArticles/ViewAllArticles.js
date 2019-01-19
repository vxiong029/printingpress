import React, { Component } from 'react';
import { connect } from 'react-redux';
// component imports
import ReadMoreButton from '../ReadMoreButton/ReadMoreButton';

// icon imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './ViewAllArticles.css';

class ViewAllArticles extends Component {
  // load all articles 
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_ALL_ARTICLE_POSTS'
    })
  }
  render() {
    return (
      <div id="container">
        <h1>View All Articles</h1>
        <div className="viewall-articles-feed">
        {this.props.blog.map(post => {
          return (
            <div key={post.id} className="viewall-articles">
              <h3>{post.title}</h3>
              <img
                alt={post.title}
                src={post.img_header}
                className="img-sub"
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
  blog: state.blog,
  user: state.user,
})

export default connect(mapStateToProps)(ViewAllArticles);