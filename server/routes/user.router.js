const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  // query text insert into 2 tables
  const quertyText = `WITH "person" AS (INSERT INTO "person"
                        ("username", "password", "email", "img_avatar")
                        VALUES ($1, $2, $3, $4) RETURNING id)
                        INSERT INTO blog ("person_id", "blog_title", "is_featured")
                        SELECT id, $5, $6
                        FROM "person";`;
  // values from registration form 
  const queryValues = [
    req.body.username,
    encryptLib.encryptPassword(req.body.password),
    req.body.email,
    req.body.img_avatar,
    req.body.blog_title,
    req.body.is_featured
  ];
  // send querytext and values to DB
  pool.query(quertyText, queryValues)
    .then(() => { res.sendStatus(201); })
    .catch((err) => { next(err); });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
