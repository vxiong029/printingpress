// react/redux imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
// css import
import '../CreatePost/CreatePost.css';
import 'draft-js-focus-plugin/lib/plugin.css';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
// draft.js imports
import {
  EditorState,
  convertToRaw,
  convertFromRaw
} from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
// allows for plugins to work
import Editor from 'draft-js-plugins-editor';
// plugin imports
import createFocusPlugin from 'draft-js-focus-plugin';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';

import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
} from 'draft-js-buttons';

// plugins objects
const focusPlugin = createFocusPlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [focusPlugin, inlineToolbarPlugin];

class ArticleComments extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    date: new Date().toLocaleString(),
  }
  handleContentChange = (editorState) => {
    this.setState({
      editorState
    });
  }
  // trigger saga post
  submitPost = (id) => {
    const content = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));

    this.props.dispatch({
      type: 'POST_COMMENT',
      payload: {
        post_content: content,
        id: id,
        date: this.state.date
      }
    });
  }
  // focus on an object
  focus = () => {
    this.editor.focus();
  }
  // convert comment texts from json to HTML
  convertContent = (text) => {
    console.log('in convert content', text);
    return stateToHTML(convertFromRaw(JSON.parse(text)));
  }
  render() {
    let comments;
    if (this.props.user.id) {
      comments =
        <div>
          <div onClick={this.focus}>
            <Editor
              editorState={this.state.editorState}
              onChange={this.handleContentChange}
              plugins={plugins}
              ref={(element) => { this.editor = element; }}
            />
            <InlineToolbar>
              {
                // may be use React.Fragment instead of div to improve perfomance after React 16
                (externalProps) => (
                  <div>
                    <BoldButton {...externalProps} />
                    <ItalicButton {...externalProps} />
                    <UnderlineButton {...externalProps} />
                    <CodeButton {...externalProps} />
                    <UnorderedListButton {...externalProps} />
                    <OrderedListButton {...externalProps} />
                    <BlockquoteButton {...externalProps} />
                  </div>
                )
              }
            </InlineToolbar>
            <p>
              <button onClick={() => this.submitPost(this.props.readArticle.id)}>Submit</button>
            </p>
          </div>
        </div>
    } 
    return (
      <div>
        <h3>Comments</h3>
        {comments}
        {this.props.comments.map(comment => {
          return (
            <div key={comment.id}>
              <h3>{comment.full_name}</h3>
              <img 
                src={comment.img_avatar}
                alt={comment.img_avatar}
                align="left"
              />
              <p>{comment.date}</p>
              <div dangerouslySetInnerHTML={{ __html: this.convertContent(comment.comment_text) }} >
              </div>
            </div>
          )
        })
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  readArticle: state.readArticle,
  comments: state.comments,
  user: state.user,
  subscription: state.subscription,
})

export default connect(mapStateToProps)(ArticleComments);

