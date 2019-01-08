const blogPosts = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_ALL_ARTICLE_POSTS':
      return action.payload;
    case 'FETCH_ARTICLE_POST':
      return action.payload;
    default:
      return state;
  }
};

export default blogPosts;
