const readArticle = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_ARTICLE_POST':
      return action.payload;
    default:
      return state;
  }
};

export default readArticle;