import React, { Component } from 'react';
import { connect } from 'react-redux';
// css import
import '../CreatePost/CreatePost.css';
import 'draft-js-focus-plugin/lib/plugin.css';
// router imports
import { Link } from 'react-router-dom';

import DeleteArticleButton from '../DeleteArticleButton/DeleteArticleButton';

// draft.js imports
import { 
  EditorState, 
  convertToRaw,
  convertFromRaw
} from 'draft-js';
// allows for plugins to work
import Editor from 'draft-js-plugins-editor';
// plugin imports
import createFocusPlugin from 'draft-js-focus-plugin';
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
// import {
//   ItalicButton,
//   BoldButton,
//   UnderlineButton,
//   CodeButton,
//   UnorderedListButton,
//   OrderedListButton,
//   BlockquoteButton,
// } from 'draft-js-buttons';

// // plugins objects
// const focusPlugin = createFocusPlugin();
// const staticToolbarPlugin = createToolbarPlugin();
// const { Toolbar } = staticToolbarPlugin;
// const plugins = [focusPlugin, staticToolbarPlugin];

class TextEditor extends Component {
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
      <div>
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

export default connect(mapStateToProps)(TextEditor);