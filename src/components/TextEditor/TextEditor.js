import React, { Component } from 'react';
import { connect } from 'react-redux';
// css import
import '../CreatePost/CreatePost.css';
import 'draft-js-focus-plugin/lib/plugin.css';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';

// icon imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// router imports
import { Link } from 'react-router-dom';

// components imports
import DeleteArticleButton from '../DeleteArticleButton/DeleteArticleButton';
import FollowButton from '../FollowButton/FollowButton';

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
  state = {
    on: true,
  }
  // edit button handle click
  handleEdit = (id) => {
    const content = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
    console.log('this is the content', content);
    console.log('this is the id', id);

    this.props.dispatch({
      type: 'EDIT_ARTICLE',
      payload: {
        post_content: content,
        id: id
      }
    });

    alert(`Your article was saved!`);
  }
  // holds the post info
  // handleDetailChange = propertyName => (event) => {
  //   this.setState({
  //     editPost: {
  //       ...this.state.editPost,
  //       [propertyName]: event.target.value,
  //     }
  //   });
  // }
  // handle content change
  handleContentChange = (editorState) => {
    this.setState({
      editorState
    });
  }
  // handle click for follow blog 
  followBlog = (id) => {
    this.props.dispatch({
      type: 'FOLLOW_USER',
      payload: { id: id }
    })

    alert(`You're now following this user!`);
  }
  // focus editor plugin
  focus = () => {
    this.editor.focus();
  }
  // toggle switch 
  toggle = () => {
    this.setState({
      // do opposite of state.on
      on: !this.state.on
    })
    console.log('hit toggle');
  }
  render() {
    let content;
    let display;
    if (this.state.on) {
      // if state.on is true show details of article 
      display =
        <div>
          <img
            src={this.props.readArticle.img_header}
            alt={this.props.readArticle.title}
            className="img-header"
          />
          <div className="toolbar">
            <p>
              <input
                type="text"
                placeholder={this.props.readArticle.title}
                className="input-details-title"
              />
            </p>
            <p>{this.props.readArticle.name}</p>
            <p>
              <FontAwesomeIcon
                icon="calendar"
              />
              {' '}
              {this.props.readArticle.date}
            </p>
            <FontAwesomeIcon
              icon="folder"
            />
            {' '}
            {this.props.readArticle.name}
            <select placeholder={this.props.readArticle.category_id}>
              <option value={1}>React</option>
              <option value={2}>CSS</option>
              <option value={3}>HTML</option>
              <option value={4}>Javascript</option>
              <option value={5}>Technology</option>
            </select>
            <p>Author: {this.props.readArticle.full_name}</p>
            <p>{this.props.readArticle.description}</p>
          </div>
          {this.props.user.full_name !== this.props.readArticle.full_name &&
            <>
              <p>
                <button onClick={() => this.followBlog(this.props.readArticle.blog_id)}>Follow</button>
              </p>
            </>
          }
          {this.props.user.full_name === this.props.readArticle.full_name &&
            <>
              <p>
                <button onClick={this.toggle}>Edit</button>
              </p>
            </>
          }
        </div>
    } else {
      // else show edit details input
      display =
        <div>
          <img
            src={this.props.readArticle.img_header}
            alt={this.props.readArticle.title}
            className="img-header"
          />
          <div className="toolbar">
            <p>
              <FontAwesomeIcon
                icon="calendar"
              />
              {' '}
              {this.props.readArticle.date}
            </p>
            <p>
              <FontAwesomeIcon
                icon="folder"
              />
              {' '}
              {this.props.readArticle.name}
            </p>
            <img
              src={this.props.readArticle.img_avatar}
              alt="img-avatar"
              className="img-nav"
            />
            {/* <h3>
              {this.props.readArticle.full_name}
            </h3> */}

            <Link
              className="username"
              to={`/articles/user/${this.props.readArticle.blog_id}`}>
              <br />
              <span>{this.props.readArticle.full_name}</span>
            </Link>

            <p>
              {this.props.readArticle.description}
            </p>
            {this.props.user.full_name !== this.props.readArticle.full_name &&
              <>
                <p>
                  <button 
                    className="submit-post-button"
                    onClick={() => this.followBlog(this.props.readArticle.blog_id)}
                  >
                    Follow
                  </button>
                </p>
              </>
            }
            {this.props.user.full_name === this.props.readArticle.full_name &&
              <>
                {/* <p>
                  <button onClick={this.toggle}>Edit</button>
                </p> */}
                <p>
                  <button
                    className="submit-post-button"
                    onClick={() => this.handleEdit(this.props.readArticle.id)}
                  >
                    Save Edit
                  </button>

                  <DeleteArticleButton
                    postId={this.props.readArticle.id}
                  />
                </p>
              </>
            }
          </div>
        </div>
    }
    if (this.props.user.full_name === this.props.readArticle.full_name) {
      content =
        <div>
          <h2>
            <span>
              {this.props.readArticle.title}
            </span>
          </h2>
          <div className="editor-read-article" onClick={this.focus}>
            <Editor
              editorState={this.state.editorState}
              onChange={this.handleContentChange}
              plugins={plugins}
              ref={(element) => { this.editor = element; }}
              data={this.props.readArticle.blog_content}
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
        </div>
    } else {
      content =
        <div>
          <h2>
            <span>
              {this.props.readArticle.title}
            </span>
          </h2>
          <div className="editor-read-article" onClick={this.focus}>
            <Editor
              editorState={this.state.editorState}
              onChange={this.handleContentChange}
              plugins={plugins}
              ref={(element) => { this.editor = element; }}
              data={this.props.readArticle.blog_content}
              readOnly
            />
          </div>
        </div>
    };
    return (
      <div>
        {JSON.stringify(this.state.editPost)}
        {display}
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