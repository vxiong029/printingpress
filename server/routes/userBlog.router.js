const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * Get blog posts of user
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryString = `SELECT "blog_posts".id, "blog_posts"."category_id", 
                    to_char("blog_posts".date, 'Mon DD, YYYY') AS "date", 
                    "blog_posts".title, "blog_posts".img_header, "category".name 
                    FROM "blog_posts" JOIN "person" ON "blog_posts".person_id = "person".id
                    JOIN "category" ON "blog_posts".category_id = "category".id
                    WHERE "person".id = $1 ORDER BY "id" DESC;`;
  let id = req.user.id;

  pool.query(queryString, [id])
    .then((result) => {
      res.send(result.rows);
    }).catch(err => {
      console.log('in userBlog router', err);
      res.sendStatus(500);
    });
});

module.exports = router;