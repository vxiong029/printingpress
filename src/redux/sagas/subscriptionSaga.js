import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// get subscription feed
function* getSubscription() {
  try {
    console.log('getSubscription saga triggered');
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
    console.log('followUser saga triggered', action.payload);
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
    console.log('unfollowUser saga triggered', action.payload);
    yield call(axios.delete, `/api/subscription/${action.payload}`);
    yield put({
      type: 'GET_SUBSCRIPTION_FEED',
    });
  } catch (error) {
    console.log('Error with unfollowUser saga', error); 
  }
}

// get sub articles
function* getSubArticles(action) {
  try {
    console.log('getSubArticles saga triggered', action.payload);
    const getSubArticles = yield call(axios.get, `/api/userArticles/${action.payload}`);
    yield put({
      type: 'FETCH_SUB_ARTICLES',
      payload: getSubArticles.data
    });
  } catch (error) {
    console.log('Error with getSubArticles saga', error);
  }
}

function* subscriptionSaga() {
  yield takeLatest('GET_SUBSCRIPTION_FEED', getSubscription);
  yield takeLatest('FOLLOW_USER', followUser);
  yield takeLatest('UNFOLLOW_USER', unfollowUser);
  yield takeLatest('GET_SUB_ARTICLES', getSubArticles);
}

export default subscriptionSaga;
