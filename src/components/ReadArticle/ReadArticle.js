// react/redux imports
import React, { Component } from 'react';
import { connect } from 'react-redux';

// component imports
import TextEditor from '../TextEditor/TextEditor';
import FollowButton from '../FollowButton/FollowButton';

class ReadArticle extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'READ_ARTICLE',
      payload: this.props.match.params.id,
    })
  }
  render() {
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
        {this.props.user.full_name !== this.props.readArticle.full_name && 
          <p>
            <FollowButton />
          </p>
        }
        <TextEditor 
          article={this.props.readArticle.blog_content}
        />
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

