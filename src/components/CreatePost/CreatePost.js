import React, { Component } from 'react';
import { connect } from 'react-redux';
// css import
import './CreatePost.css';
import 'draft-js-focus-plugin/lib/plugin.css';
// draft.js imports
import { EditorState } from 'draft-js';
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


// objects can be passed in as arguments
const focusPlugin = createFocusPlugin();
const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;

const plugins = [focusPlugin, staticToolbarPlugin];

class CreatePost extends Component {
  // empty state of blog post
  state = {
    title: '',
    date: '',
    editorState: EditorState.createEmpty(),
  }
  // holds the post info
  handleInfoChange = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }
  handleContentChange = editorState => {
    this.setState({
      editorState
    })
  }
  // trigger saga post
  submitPost = () => {
    console.log('in submitPost');

    this.props.dispatch({
      type: 'POST_BLOG',
      payload: this.state
    })
  }
  // focus on an object
  focus = () => {
    this.editor.focus();
  }
  render() {
    return (
      <div>
        <h1>Create New Post</h1>
        <div className="toolbar">
          <input
            type="text"
            placeholder="Title"
            onChange={this.handleInfoChange('title')}
          />
          <input
            type="date"
            placeholder="Date"
            onChange={this.handleInfoChange('date')}
          />
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