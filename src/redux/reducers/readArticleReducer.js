//get the functions that you need
// import { convertFromRaw } from 'draft-js';

const readArticle = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_ARTICLE_POST':
      return action.payload;
    default:
      return state;
  }
};

export default readArticle;