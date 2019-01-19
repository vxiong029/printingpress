const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * Get comments feed based on blog_post id
 */
router.get('/:id', (req, res) => {
  const queryString = `SELECT "comment_posts".id, to_char("comment_posts".date, 'Mon DD, YYYY') 
                    AS "date", "comment_posts".comment_text, "person".full_name, 
                    "person".img_avatar, "person".id AS "person_id", "blog_posts".id 
                    AS "blog_post_id" FROM "comment_posts"
                    JOIN "blog_posts" ON "comment_posts".blog_posts_id = "blog_posts".id
                    JOIN "person" ON "comment_posts".person_id = "person".id
                    WHERE "blog_posts".id = $1; `;

  let id = req.params.id;

  pool.query(queryString, [id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error completing SELECT get query', err);
      res.sendStatus(500);
    });
});

/**
 * Post into comments table
 */
router.post('/post', rejectUnauthenticated, (req, res) => {
  // values of input field in createPost
  let queryValues = [
    req.user.id,
    req.body.id,
    req.body.date,
    req.body.post_content,
  ];
  let queryString = `INSERT INTO "comment_posts" 
                  ("person_id", "blog_posts_id", "date", "comment_text") 
                  VALUES ($1, $2, $3, $4);`;

  pool.query(queryString, queryValues)
    .then(result => {
      res.sendStatus(201);
    }).catch(err => {
      console.log('error in post comments post:', err);
      res.sendStatus(500);
    })
});

module.exports = router;