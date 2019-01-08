import React from 'react';
import { connect } from 'react-redux';

const ReadMoreButton = props => (
  <button
    onClick={() => props.dispatch({
      type: 'READ_ARTICLE',
      payload: props.postId
    })}
  >
    Read More...
  </button>
);

export default connect()(ReadMoreButton);