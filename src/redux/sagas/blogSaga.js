import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// get blog post saga
function* getArticlePosts() {
  try {
    console.log('getArticlePosts triggered');
    const blogPost = yield call(axios.get, `/api/blog`);
    yield put({
      type: 'FETCH_ARTICLE_POSTS',
      payload: blogPost.data
    })
  } catch (error) {
    console.log('Error with user get blog posts');
  }
}

// create article post saga
function* createArticle(action) {
  try {
    // log trigger
    console.log('createPost triggered');
    // make my axios call (action.payload already an object)
    // if it wasn't MAKE AN OBJECT & SEND IT TO DB
    yield call(axios.post, '/api/blog/post', action.payload);
    // dispatch to getBlogPosts saga in order to update VIEW
    yield put({
      type: 'GET_ARTICLE_POSTS'
    });
  } catch (error) {
    console.log('Error with user create post:', error);
  }
}

// delete article saga
function* deleteArticle(action) {
  try{
    console.log('deleteArticle triggered', action.payload);
    yield call(axios.delete, `/api/blog/${action.payload}`);
    yield put({
      type: 'GET_ARTICLE_POSTS'
    });
  } catch (error) {
    console.log('Error with user delete article:', error);
  }
}

function* blogSaga() {
  yield takeLatest('GET_ARTICLE_POSTS', getArticlePosts);
  yield takeLatest('POST_ARTICLE', createArticle);
  yield takeLatest('DELETE_ARTICLE', deleteArticle);
}

export default blogSaga;
