const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const blogRouter = require('./routes/blog.router');
const subscriptionRouter = require('./routes/subscription.router');
const userBlogRouter = require('./routes/userBlog.router');
const commentsRouter = require('./routes/comments.router');
const userArticlesRouter = require('./routes/userArticles.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/blog', blogRouter);
app.use('/api/userBlog', userBlogRouter);
app.use('/api/subscription', subscriptionRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/userArticles', userArticlesRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

module.exports = app;