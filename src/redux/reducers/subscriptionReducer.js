const subscription = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_SUBSCRIPTION_FEED':
      return action.payload;
    default:
      return state;
  }
};

export default subscription;
