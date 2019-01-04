import React, { Component } from 'react';
import { connect } from 'react-redux';

import { stateToHTML } from 'draft-js-export-html'; 
import { convertFromRaw } from 'draft-js';

class UserBlog extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_BLOG_POSTS'
    })
  }
  convertContent = (text) => { 
    return stateToHTML(convertFromRaw(JSON.parse(text)));
  }
  render() {
      console.log('user blog:', this.props.blog);
    return (
      <div>
          <h1>Blog</h1>
          {this.props.blog.map(post => {
            return (
              <div key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.date}</p>
                <p>Author: {post.person_id}</p>
                <div 
                  dangerouslySetInnerHTML={
                    { __html: this.convertContent(post.blog_content) }}> 
                </div>
              </div>
            )
          })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  blog: state.blog 
})

export default connect(mapStateToProps)(UserBlog);