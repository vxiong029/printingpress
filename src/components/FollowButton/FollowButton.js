import React from 'react';
import { connect } from 'react-redux';

const FollowButton = props => (
  <button
    onClick={() => props.dispatch({
      type: 'FOLLOW_USER',
      payload: {id: props.blogId}
    })}
  >
    Follow
  </button>
);

export default connect()(FollowButton);