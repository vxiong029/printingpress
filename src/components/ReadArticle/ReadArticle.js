import React, { Component } from 'react';
import { connect } from 'react-redux';

import { stateToHTML } from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js';
import { Link } from 'react-router-dom';

import DeleteArticleButton from '../DeleteArticleButton/DeleteArticleButton';

class ReadArticle extends Component {
  // componentDidMount() {
  //   let subscription = this.props.subscription;
  //   for(let one of subscription) {
  //     console.log('component did mount', one);
      
  //     return one;
  //   }
  // }
  // delete button handle click
  // handleDelete = (id) => {
  //   console.log('in handle delete', id);

  //   this.props.dispatch({
  //     type: 'DELETE_ARTICLE',
  //     payload: id
  //   })
  //   // push to view all article page
  //   this.props.history.push('/articles');
  // }
  // edit button handle click
  handleEdit = (id) => {
    console.log('in handle edit', id);

    this.props.dispatch({
      type: 'EDIT_ARTICLE',
      payload: id
    })
  }
  // follow button handle click
  handleFollow = (id) => {
    // post
    this.props.dispatch({
      type: 'FOLLOW_USER',
      payload: {id}
    })
  }
  // unfollow button handleclick
  handleUnfollow = (id) => {
    this.props.dispatch({
      type: 'UNFOLLOW_USER',
      payload: {id}
    })
  }
  // convert draft.js object to HTML
  convertContent = (text) => {
    console.log('in convert content', text);
    return stateToHTML(convertFromRaw(JSON.parse(text)));
  }
  render() {
    console.log('in read article', this.props.readArticle);
    
    return (
      <div>      
        {this.props.readArticle.map(post => {
          return (
            <div key={post.id}>
              <img
                alt={post.title}
                src={post.img_header}
                width="500"
                height="500"
              />
              <h1>{post.title}</h1>
              <h4>Author: {post.full_name}</h4>
              <p>{post.description}</p>
              {this.props.user.full_name !== post.full_name && (
                <>
                  <button onClick={() => this.handleFollow(post.blog_id)}>Follow</button>
                </>
              )
                // ? 
                // <button onClick={() => this.handleUnfollow(article.blog_id)}>Unfollow</button>
                // :
              } 
              <p>Date: {post.date} / Category: {post.name}</p>
              <div dangerouslySetInnerHTML={{ __html: this.convertContent(post.blog_content)}} >
              </div>
              {this.props.user.full_name === post.full_name && (
                <>
                  <button onClick={() => this.handleEdit(post.id)}>Edit</button>
                  <Link to="/articles">
                    <DeleteArticleButton
                      postId={post.id}
                    />
                  </Link>
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
  readArticle: state.readArticle,
  user: state.user,
  subscription: state.subscription,
})

export default connect(mapStateToProps)(ReadArticle);

