// react/redux imports
import React, { Component } from 'react';
import { connect } from 'react-redux';

// component imports
import TextEditor from '../TextEditor/TextEditor';
import ArticleComments from '../ArticleComments/ArticleComments';

class ReadArticle extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'READ_ARTICLE',
      payload: this.props.match.params.id,
    })
    this.props.dispatch({
      type: 'LOAD_COMMENTS',
      payload: this.props.match.params.id,
    })
  }
  render() {
    return (
      <div id="container" key={this.props.readArticle.id}>
        <TextEditor
        />
        <ArticleComments
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

