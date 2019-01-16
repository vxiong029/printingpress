const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * Get all of the blog posts
 */
router.get('/', (req, res) => {
  const queryString = `SELECT "person".full_name, "blog_posts".id, "title", 
                    to_char("date", 'Mon DD, YYYY') AS "date", 
                    "category".name, "blog_posts".img_header, "blog_posts".blog_content
                    FROM "blog_posts" JOIN "person" ON "blog_posts".person_id = "person".id 
                    JOIN "category" ON "blog_posts".category_id = "category".id 
                    ORDER BY "id" DESC;`;
  pool.query(queryString)
    .then((result) => {
      res.send(result.rows);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

/**
 * Get ONE blog post based on id of ARTICLE
 */
router.get('/:id', (req, res) => {
  const queryString = `SELECT "blog_posts".id, "person".full_name, "person".description,
                    "blog".id AS "blog_id", "title", to_char("date", 'Mon DD, YYYY') AS "date", 
                    "category".name, "category".id AS "category_id", "img_header", 
                    "blog_content" FROM "blog_posts" 
                    JOIN "person" ON "blog_posts".person_id = "person".id 
                    JOIN "category" ON "blog_posts".category_id = "category".id 
                    JOIN "blog" ON "blog".id = "person".id
                    WHERE "blog_posts".id = $1;`;
  let id = req.params.id;

  pool.query(queryString, [id])
    .then((result) => { 
      // sending back array of objects as just an object
      // picking the first thing out of the array of object
      let obj = result.rows[0];
      res.send(obj);

      console.log('in blog router get by id', obj);
    })
    .catch((err) => {
      console.log('Error completing SELECT get query', err);
      res.sendStatus(500);
    });
});

/**
 * Add a blog post for the logged in user 
 */
router.post('/post', rejectUnauthenticated, (req, res) => {
  console.log('in blog post');
  // values of input field in createPost
  const queryValues = [
    req.body.post_details.img_header,
    req.body.post_details.title,
    req.body.post_details.date,
    req.body.post_details.category_id,
    req.body.post_content,
    req.user.id
  ];

  const queryString = `INSERT INTO "blog_posts" ("img_header", "title", 
                  "date", "category_id", "blog_content", "person_id")
                  VALUES ($1, $2, $3, $4, $5, $6);`;
  pool.query(queryString, queryValues)
    .then(result => {
      res.sendStatus(201);
    }).catch(err => {
      console.log('error in post blog post:', err);
      res.sendStatus(500);
    })
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const queryString = `DELETE FROM "blog_posts" WHERE "id" = $1;`;
  let id = req.params.id;
  console.log('route delete', id);
  
  pool.query(queryString, [id])
    .then(result => {
      res.sendStatus(201);
    }).catch(err => {
      console.log('error in delete:', err);
      res.sendStatus(500);
    })
});

/**
 * Update an article blog content if it's something the logged in user added
 */
router.put('/:id', rejectUnauthenticated, (req, res) => {
  const queryValues = [
    req.body.post_content,
    req.params.id
  ]
  const queryString = `UPDATE "blog_posts" SET "blog_content" = $1 
                    WHERE "id" = $2;`;

  // console.log('route edit/put', queryValues);

  pool.query(queryString, queryValues)
    .then(result => {
      res.send(201);
    }).catch(err => {
      console.log('error in update/put:', err);
      res.sendStatus(500);
    })
});

module.exports = router;