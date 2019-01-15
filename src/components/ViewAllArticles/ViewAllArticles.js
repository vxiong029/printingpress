import React, { Component } from 'react';
import { connect } from 'react-redux';
// router imports
import { Link } from 'react-router-dom';
// component imports
import ReadMoreButton from '../ReadMoreButton/ReadMoreButton';

class ViewAllArticles extends Component {
  // load all articles 
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_ALL_ARTICLE_POSTS'
    })
  }
  render() {
    return (
      <div>
          <h1>Articles</h1>
        {this.props.blog.map(post => {
            return (
              <div key={post.id}>
                <h2>{post.title}</h2>
                  <img 
                    alt={post.title}
                    src={post.img_header} 
                    width="100" 
                    height="100"
                  />
                <p>{post.date}</p>
                <p>Category: {post.name}</p>
                <p>Author: {post.full_name}</p>
                {/* <Link to={`/articles/${post.id}`}> */}
                  <ReadMoreButton
                    postId={post.id}
                  />
                {/* </Link> */}
              </div>
            )
          })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  blog: state.blog,
  user: state.user,
})

export default connect(mapStateToProps)(ViewAllArticles);