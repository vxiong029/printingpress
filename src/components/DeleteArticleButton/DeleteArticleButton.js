import React from 'react';
import { connect } from 'react-redux';

const DeleteArticleButton = props => (
  <button
    onClick={() => props.dispatch({ 
      type: 'DELETE_ARTICLE',
      payload: props.postId 
    })}
  >
    Delete
  </button>
);

export default connect()(DeleteArticleButton);
