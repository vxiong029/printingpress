// react/redux imports
import React, { Component } from 'react';
import { connect } from 'react-redux';

// component imports
import TextEditor from '../TextEditor/TextEditor';

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
        <TextEditor
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

