import React, { Component } from 'react';
import { connect } from 'react-redux';

class ViewAllArticles extends Component {
  // load all articles 
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_ALL_ARTICLE_POSTS'
    })
  }
  // read more button handle click
  handleRead = (id) => {
    console.log('in handle read', id);
    // dispatch to blogSaga
    this.props.dispatch({
      type: 'READ_ARTICLE',
      payload: id
    })
    // push to article page
    this.props.history.push('/readArticle');
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
                <p>
                  <img 
                    alt={post.title}
                    src={post.img_header} 
                    width="100" 
                    height="100"
                  />
                </p>
                <p>{post.date}</p>
                <p>Category: {post.name}</p>
                <p>Author: {post.full_name}</p>
                <p><button onClick={() => this.handleRead(post.id)}>Read More...</button></p>
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