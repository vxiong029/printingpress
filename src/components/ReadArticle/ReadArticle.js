import React, { Component } from 'react';
import { connect } from 'react-redux';

import { stateToHTML } from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js';

class ReadArticle extends Component {
  // delete button handle click
  handleDelete = (id) => {
    console.log('in handle delete', id);

    this.props.dispatch({
      type: 'DELETE_ARTICLE',
      payload: id
    })
  }
  // edit button handle click
  handleEdit = (id) => {
    console.log('in handle edit', id);

    this.props.dispatch({
      type: 'EDIT_ARTICLE',
      payload: id
    })
  }
  // convert draft.js object to HTML
  convertContent = (text) => {
    return stateToHTML(convertFromRaw(JSON.parse(text)));
  }
  render() {
    console.log('in readArticle.js', this.props.readArticle);

    return (
      <div>
        {this.props.readArticle.map(article => {
          return (
            <div key={article.id}>
              <img
                alt={article.title}
                src={article.img_header}
                width="500"
                height="500"
              ></img>
              <h1>{article.title}</h1>
              <h4>Author: {article.full_name}</h4>
              <p>{article.description}</p>
              {this.props.user.id && (
                <>
                  <button onClick={() => this.handleFollow(this.props.user.id)}>Follow</button>
                </>
              )}
              <p>Date: {article.date} / Category: {article.name}</p>
              <div dangerouslySetInnerHTML={{ __html: this.convertContent(article.blog_content) } } >
              </div>
              {this.props.user.full_name === article.full_name && (
                <>
                  <button onClick={() => this.handleEdit(article.id)}>Edit</button>
                  <button onClick={() => this.handleDelete(article.id)}>Delete</button>
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
})

export default connect(mapStateToProps)(ReadArticle);

