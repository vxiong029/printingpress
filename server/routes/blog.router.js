const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * Get all of the blog posts
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryString = `SELECT "person".username, "blog_posts".id, "title", 
                    to_char("date", 'Mon DD, YYYY') AS "date", 
                    "category".name, "blog_content" FROM "blog_posts" 
                    JOIN "person" ON "blog_posts".person_id = "person".id 
                    JOIN "category" ON "blog_posts".category_id = "category".id 
                    ORDER BY "id" DESC;`;
  pool.query(queryString)
    .then((result) => {
      res.send(result.rows);
    }).catch(error => {
      console.log(error);
      res.sendStatus(500);
    });
});

/**
 * Add a blog post for the logged in user 
 */
router.post('/post', rejectUnauthenticated, (req, res) => {
  console.log('in post ', req.user);
  // hold req.body in variable to shorten query insert
  let post_content = req.body.post_content;
  let post_details = req.body.post_details;

  let queryText = `INSERT INTO "blog_posts" ("title", "date", "category_id", 
                "blog_content", "person_id")
                VALUES ($1, $2, $3, $4, $5);`;
  pool.query(queryText, [post_details.title, post_details.date, 
              post_details.category_id, post_content, req.user.id])
    .then(result => {
      res.sendStatus(201);
    }).catch(error => {
      console.log('error in post blog post:', error);
      res.sendStatus(500);
    })
});


/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {
  queryString = `DELETE FROM "blog_posts" WHERE "id" = $1;`;
  let id = req.params.id
  console.log('route delete', id);
  
  pool.query(queryString, [id])
    .then(result => {
      res.sendStatus(201);
    }).catch(error => {
      console.log('error in delete:', error);
      res.sendStatus(500);
    })
});

/**
 * Return all users along with the total number of items 
 * they have added to the shelf
 */
// router.get('/count', (req, res) => {
//   queryString = `SELECT "person".username, COUNT("item".person_id) FROM "person"
//     LEFT JOIN "item" ON "person".id = "item".person_id 
//     GROUP BY "person".id 
//     ORDER BY "person".id;`
//   pool.query(queryString).then(results => {
//     res.send(results.rows)
//   }).catch(error => {
//     res.sendStatus(500)
//     console.log('error in get count', error);

//   })
// });

module.exports = router;