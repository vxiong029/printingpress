const userArticles = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_SUB_ARTICLES':
      return action.payload;
    default:
      return state;
  }
};

export default userArticles;
