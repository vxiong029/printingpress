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

// edit article post saga
function* editArticle(action) {
  try{
    console.log('editArticle saga triggered', action.payload);
    yield call(axios.put, `/api/blog/${action.payload.id}`, action.payload);
    yield put({
      type: 'READ_ARTICLE',
      payload: action.payload.id
    })
  } catch (error) {
    console.log('Error with user edit article:', error);
  }
}

// post comment in article saga
function* createComment(action) {
  try{
    console.log('postComment saga triggered', action.payload);
    yield call(axios.post, '/api/comments/post', action.payload);
    yield put({
      type: 'LOAD_COMMENTS',
      payload: action.payload
    });
  } catch (error) {
    console.log('Error with user create comment post:', error);
  }
}

// get comments for article saga
function* getComments(action) {
  try {
    console.log('getComment saga triggered', action.payload);
    const comments = yield call(axios.get, `/api/comments/${action.payload}`);
    yield put({
      type: 'FETCH_ALL_COMMENTS',
      payload: comments.data
    });
  } catch (error) {
    console.log('Error with user create comment post:', error);
  }
}

function* blogSaga() {
  yield takeLatest('GET_ALL_ARTICLE_POSTS', getAllArticlePosts);
  yield takeLatest('POST_ARTICLE', createArticle);
  yield takeLatest('DELETE_ARTICLE', deleteArticle);
  yield takeLatest('EDIT_ARTICLE', editArticle);
  yield takeLatest('READ_ARTICLE', readArticle);
  yield takeLatest('GET_USER_ARTICLES', getUserArticles);
  yield takeLatest('POST_COMMENT', createComment);
  yield takeLatest('LOAD_COMMENTS', getComments);
}

export default blogSaga;
