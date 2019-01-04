import React, { Component } from 'react';
import { connect } from 'react-redux';
// css import
import './CreatePost.css';
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
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
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
const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;
const plugins = [focusPlugin, staticToolbarPlugin];

class CreatePost extends Component {
  // empty state of blog post
  state = {
    newPost: {
      title: '',
      date: '',
      category_id: 1,
    },
    editorState: EditorState.createEmpty(),
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
    const content = convertToRaw(this.state.editorState.getCurrentContent());
    
    this.props.dispatch({
      type: 'POST_BLOG',
      payload: {
        blog_content: content,
        blog_details: this.state.newPost
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
        <h1>Create New Post</h1>
        <pre>{JSON.stringify(this.state.newPost)}</pre>
        <div className="toolbar">
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
          <Toolbar>
            {
              // may be use React.Fragment instead of div to improve perfomance after React 16
              (externalProps) => (
                <div>
                  <BoldButton {...externalProps} />
                  <ItalicButton {...externalProps} />
                  <UnderlineButton {...externalProps} />
                  <CodeButton {...externalProps} />
                  <Separator {...externalProps} />
                  <UnorderedListButton {...externalProps} />
                  <OrderedListButton {...externalProps} />
                  <BlockquoteButton {...externalProps} />
                </div>
              )
            }
          </Toolbar>
        </div>
        <div className="editor" onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.handleContentChange}
            plugins={plugins}
            ref={(element) => { this.editor = element; }}
          />
        </div>
        <div>
          <button onClick={this.submitPost}>Post</button>
        </div>
      </div>
    )
  }
}

export default connect()(CreatePost);