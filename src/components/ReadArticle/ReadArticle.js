// react/redux imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
// router imports
import { Link } from 'react-router-dom';
// draftjs imports
import Editor from 'draft-js-plugins-editor';
import {
  convertToRaw,
  convertFromRaw,
  EditorState
} from 'draft-js';

// component imports
import DeleteArticleButton from '../DeleteArticleButton/DeleteArticleButton';
import FollowButton from '../FollowButton/FollowButton';

class ReadArticle extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'READ_ARTICLE',
      payload: this.props.match.params.id,
    })
  }

  constructor(props) {
    super(props);
    if (!this.props.readArticle.blog_content) {
      this.state = {
        editorState: EditorState.createEmpty()
      };
      console.log('empty');
    } else {
      const rawContent = this.props.readArticle.blog_content;
      const parsedContent = convertFromRaw(JSON.parse(rawContent));

      this.state = {
        editorState: EditorState.createWithContent(parsedContent)
      };
      console.log('not empty');
    }
  }
  // edit button handle click
  handleEdit = (id) => {
    console.log('in handle edit', id);

    this.props.dispatch({
      type: 'EDIT_ARTICLE',
      payload: id
    })
  }
  // handle content change
  handleContentChange = (editorState) => {
    this.setState({
      editorState
    });
  }
  render() {
    let content;
    if (this.props.user.full_name === this.props.readArticle.full_name) {
      content =
        <div>
          <Editor
            editorState={this.state.editorState}
            onChange={this.handleContentChange}
            // plugins={plugins}
            ref={(element) => { this.editor = element; }}
            data={this.props.readArticle.blog_content}
          />
          <p>
            <button onClick={() => this.handleEdit(this.props.readArticle.id)}>Save Edit</button>
            <Link to="/articles">
              <DeleteArticleButton
                postId={this.props.readArticle.id}
              />
            </Link>
          </p>
        </div>
    } else {
      content =
        <div>
          <Editor
            editorState={this.state.editorState}
            onChange={this.handleContentChange}
            // plugins={plugins}
            ref={(element) => { this.editor = element; }}
            data={this.props.readArticle.blog_content}
            readOnly
          />
        </div>
    }
    return (
      <div key={this.props.readArticle.id}>
        <h2>{this.props.match.params.id}</h2>
        <img
          src={this.props.readArticle.img_header}
          alt={this.props.readArticle.title}
          width="500"
          height="500"
        />
        <h1>{this.props.readArticle.title}</h1>
        <p>Date: {this.props.readArticle.date}</p>
        <p>Author: {this.props.readArticle.full_name}</p>
        <p>{this.props.readArticle.description}</p>
        {content}
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

