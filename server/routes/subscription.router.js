const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * Get subscription feed based on user id
 */
router.get('/:id', (req, res) => {
  const queryString = `SELECT "subscription_feed".id, "subscription_feed".person_id, 
                    "subscription_feed".blog_id AS "sub_blog_id", 
                    "blog".id AS "blog_id", "blog".person_id 
                    AS "blog_person_id", "person".full_name, 
                    "person".description FROM "subscription_feed" 
                    JOIN "blog" ON "blog".id = "subscription_feed".blog_id 
                    JOIN "person" ON "person".id = "blog".person_id 
                    WHERE "subscription_feed".person_id = $1;`;
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
 * Follow a user - post into subscrition_feed database table
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('in subscription post', req.body);
  // values of input field in createPost
  let queryValues = [
    req.body.id,
    req.user.id,
    req.body.active,
  ];

  let queryString = `INSERT INTO "subscription_feed" 
                  ("blog_id", "person_id", "active") 
                  VALUES ($1, $2, $3);`;
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
router.delete('/:id', (req, res) => {
  const queryString = `DELETE FROM "subscription_feed" 
                    WHERE "subscription_feed"."blog_id" = $1;`;
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

module.exports = router;