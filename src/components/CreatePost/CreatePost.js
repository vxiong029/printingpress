import React, { Component } from 'react';
import { connect } from 'react-redux';
// css import
import '../CreatePost/CreatePost.css';
import 'draft-js-focus-plugin/lib/plugin.css';
// draft.js imports
import {
  EditorState,
  convertToRaw,
  // convertFromRaw
} from 'draft-js';
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

class CreatePost extends Component {
  // empty state of blog post
  state = {
    newPost: {
      img_header: '',
      title: '',
      date: '',
      category_id: 1,
    },
    editorState: EditorState.createEmpty(),
    //   editorState: editorStateFromRaw(this.props.readArticle.blog_content)
  }
  // holds the post info
  handleDetailChange = propertyName => (event) => {
    this.setState({
      newPost: {
        ...this.state.newPost,
        [propertyName]: event.target.value,
      }
    });
  }
  handleContentChange = (editorState) => {
    this.setState({
      editorState
    });
  }
  // trigger saga post
  submitPost = () => {
    const content = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
    console.log(content);

    this.props.dispatch({
      type: 'POST_ARTICLE',
      payload: {
        post_content: content,
        post_details: this.state.newPost
      }
    });
  }
  // focus on an object
  focus = () => {
    this.editor.focus();
  }
  render() {
    return (
      <div>
        <pre>{JSON.stringify(this.state.newPost)}</pre>
        <div className="toolbar">
          <input
            type="url"
            placeholder="Article Image"
            onChange={this.handleDetailChange('img_header')}
          />
          <input
            type="text"
            placeholder="Title"
            onChange={this.handleDetailChange('title')}
          />
          <input
            type="date"
            placeholder="Date"
            onChange={this.handleDetailChange('date')}
          />
          <select onChange={this.handleDetailChange('category_id')}>
            <option value={1}>React</option>
            <option value={2}>CSS</option>
            <option value={3}>HTML</option>
            <option value={4}>Javascript</option>
            <option value={5}>Technology</option>
          </select>

        </div>
        <div className="editor" onClick={()=> this.focus}>
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
        </div>
        <div>
          <button onClick={this.submitPost}>Submit</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  readArticle: state.readArticle,
  user: state.user,
  subscription: state.subscription,
})

export default connect(mapStateToProps)(CreatePost);