const comments = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_ALL_COMMENTS':
      return action.payload;
    default:
      return state;
  }
};

export default comments;
