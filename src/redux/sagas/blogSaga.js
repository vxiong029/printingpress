import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// get blog post saga
function* getAllArticlePosts() {
  try {
    console.log('getALLArticlePosts triggered');
    const blogPost = yield call(axios.get, '/api/blog');
    yield put({
      type: 'FETCH_ALL_ARTICLE_POSTS',
      payload: blogPost.data
    });
  } catch (error) {
    console.log('Error with get all blog posts', error);
  }
}

// get ONE article based on ID of ARTICLE
function* readArticle(action) {
  try {
    console.log('readArticle saga triggered');
    // make call to blog route based on id
    const readArticle = yield call(axios.get, `/api/blog/${action.payload}`);
    // dispatch to readArticle reducer
    yield put({
      type: 'FETCH_ARTICLE_POST',
      payload: readArticle.data
    });
    // yield action.history.push(`/readArticle/${action.payload}`);
  } catch (error) {
    console.log('Error with user read article:', error);
  }
}

// get ALL articles based on ID of USER
function* getUserArticles() {
  try {
    console.log('getUserArticles triggered');
    const userPosts = yield call(axios.get, '/api/userBlog');
    yield put({
      type: 'FETCH_ALL_ARTICLE_POSTS',
      payload: userPosts.data
    });
  } catch (error) {
    console.log('Error with get user articles', error);
  }
}

// create article post saga
function* createArticle(action) {
  try {
    // log trigger
    console.log('createPost saga triggered');
    // make my axios call (action.payload already an object)
    // if it wasn't MAKE AN OBJECT & SEND IT TO DB
    yield call(axios.post, '/api/blog/post', action.payload);
    // dispatch to getBlogPosts saga in order to update VIEW
    yield put({
      type: 'GET_ALL_ARTICLE_POSTS'
    });
  } catch (error) {
    console.log('Error with user create post:', error);
  }
}

// delete article saga
function* deleteArticle(action) {
  try{
    console.log('deleteArticle saga triggered', action.payload);
    yield call(axios.delete, `/api/blog/${action.payload}`);
    yield put({
      type: 'GET_ALL_ARTICLE_POSTS'
    });
  } catch (error) {
    console.log('Error with user delete article:', error);
  }
}

// edit article saga
function* editArticle(action) {
  try{
    console.log('editArticle saga triggered', action.payload);
  } catch (error) {
    console.log('Error with user edit article:', error);
  }
}

function* blogSaga() {
  yield takeLatest('GET_ALL_ARTICLE_POSTS', getAllArticlePosts);
  yield takeLatest('POST_ARTICLE', createArticle);
  yield takeLatest('DELETE_ARTICLE', deleteArticle);
  yield takeLatest('EDIT_ARTICLE', editArticle);
  yield takeLatest('READ_ARTICLE', readArticle);
  yield takeLatest('GET_USER_ARTICLES', getUserArticles);
}

export default blogSaga;
