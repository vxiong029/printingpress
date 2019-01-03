import { combineReducers } from 'redux';

const blogPosts = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_BLOG_POSTS':
      return { ...state };
    default:
      return state;
  }
};

export default combineReducers({
  blogPosts
});
