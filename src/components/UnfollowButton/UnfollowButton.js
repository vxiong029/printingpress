import React from 'react';
import { connect } from 'react-redux';

const UnfollowButton = props => (
  <button
    onClick={() => props.dispatch({
      type: 'UNFOLLOW_USER',
      payload: props.blogId
    })}
  >
    X
  </button>
);

export default connect()(UnfollowButton);