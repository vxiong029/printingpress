import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// get blog post saga
function* getBlogPosts() {
  try {
    console.log('getBlogPosts triggered');
    const blogPost = yield call(axios.get, '/api/blog');
    yield put({
      type: 'FETCH_BLOG_POSTS',
      payload: blogPost.data
    })
  } catch (error) {
    console.log('Error with user get blog posts');
  }
}

// create blog post saga
function* createBlogPost(action) {
  try {
    // log trigger
    console.log('createPost triggered');
    // make my axios call (action.payload already an object)
    // if it wasn't MAKE AN OBJECT & SEND IT TO DB
    yield call(axios.post, '/api/blog/post_blog', action.payload);
    // dispatch to getBlogPosts saga in order to update VIEW
    yield put({
      type: 'GET_BLOG_POSTS'
    });
  } catch (error) {
    console.log('Error with user create post:', error);
  }
}

function* blogSaga() {
  yield takeLatest('GET_BLOG_POSTS', getBlogPosts);
  yield takeLatest('POST_BLOG', createBlogPost);
}

export default blogSaga;
