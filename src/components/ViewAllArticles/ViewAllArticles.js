import React, { Component } from 'react';
import { connect } from 'react-redux';

import { stateToHTML } from 'draft-js-export-html'; 
import { convertFromRaw } from 'draft-js';

class UserBlog extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_ARTICLE_POSTS'
    })
  }
  convertContent = (text) => { 
    return stateToHTML(convertFromRaw(JSON.parse(text)));
  }
  handleDelete = (id) => {
    console.log('in handle delete', id);
  }
  handleEdit = (id) => {
    console.log('in handle edit', id);
  }
  render() {
      console.log('Article object:', this.props.blog);
    return (
      <div>
          <h1>Articles</h1>
          {this.props.blog.map(post => {
            return (
              <div key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.date}</p>
                <p>Category: {post.name}</p>
                <p>Author: {post.username}</p>
                <div 
                  dangerouslySetInnerHTML={
                    { __html: this.convertContent(post.blog_content) }}> 
                </div>
                {this.props.user.username === post.username &&  (
                  <>
                    <button onClick={() => this.handleEdit(post.id)}>Edit</button>
                    <button onClick={() => this.handleDelete(post.id)}>Delete</button>
                  </>
                )}
              </div>
            )
          })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  blog: state.blog 
})

export default connect(mapStateToProps)(UserBlog);