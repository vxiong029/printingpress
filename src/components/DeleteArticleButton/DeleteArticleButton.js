import React from 'react';
import { connect } from 'react-redux';

// icon imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DeleteArticleButton = props => (
  <FontAwesomeIcon
    onClick={() => props.dispatch({
      type: 'DELETE_ARTICLE',
      payload: props.postId
    })}
    icon="trash"
    className="delete-button"
  />
);

export default connect()(DeleteArticleButton);
