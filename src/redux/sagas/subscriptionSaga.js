import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// get subscription feed
function* getSubscription() {
  try {
    console.log('getSubscription feed by user id:');
    const subFeed = yield call(axios.get, `/api/subscription`);
    yield put({
      type: 'FETCH_SUBSCRIPTION_FEED',
      payload: subFeed.data
    });
  } catch (error) {
    console.log('Error with getSubscription feed', error);
  }
}

// post follow user saga
function* followUser(action) {
  try {
    console.log('followUser triggered (blog_id):');
    yield call(axios.post, `/api/subscription`, action.payload);
    yield put({
      type: 'GET_SUBSCRIPTION_FEED',
    });
  } catch (error) {
    console.log('Error with followUser saga', error);
  }
}

// unfollow user saga
function* unfollowUser(action) {
  try {
    console.log('unfollowUser triggered', action.payload);
    yield call(axios.delete, `/api/subscription/${action.payload}`);
    yield put({
      type: 'GET_SUBSCRIPTION_FEED',
    });
  } catch (error) {
    console.log('Error with unfollowUser saga', error); 
  }
}

function* subscriptionSaga() {
  yield takeLatest('GET_SUBSCRIPTION_FEED', getSubscription);
  yield takeLatest('FOLLOW_USER', followUser);
  yield takeLatest('UNFOLLOW_USER', unfollowUser);
}

export default subscriptionSaga;
