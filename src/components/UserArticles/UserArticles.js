// react/redux imports
import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReadMoreButton from '../ReadMoreButton/ReadMoreButton';

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
      <div>
        <h2>{this.props.match.params.id}</h2>
        {this.props.userArticles.map(post => {
          return (
            <div
              key={post.id}
            >
              <h2>{post.title}</h2>
              <p>
                <img
                  className="img-art"
                  alt=""
                  src={post.img_header}
                />
              </p>
              <p>{post.date}</p>
              <p>Category: {post.name}</p>

              <ReadMoreButton
                postId={post.id}
              />

            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userArticles: state.userArticles,
  user: state.user,
})

export default connect(mapStateToProps)(ReadArticle);

