import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const ReadMoreButton = props => (
  <button
    onClick={() => {
      // props.dispatch({
      //   type: 'READ_ARTICLE',
      //   payload: props.postId,
      //   // history: props.history
      // })
      props.history.push(`/articles/${props.postId}`)
    }
  }
  >
    Read More...
  </button>
);

export default withRouter(connect()(ReadMoreButton));