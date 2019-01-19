import React from 'react';
import { connect } from 'react-redux';

// icon imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UnfollowButton = props => (

  <FontAwesomeIcon
    onClick={() => props.dispatch({
      type: 'UNFOLLOW_USER',
      payload: props.blogId
    })}
    icon="trash"
  />

);

export default connect()(UnfollowButton);