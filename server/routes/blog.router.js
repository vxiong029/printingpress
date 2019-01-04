const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * Get all of the blog posts
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryString = `SELECT to_char("date", 'Mon DD, YYYY') 
                    AS "date", "title", "blog_content" FROM "blog_posts";`;
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
router.post('/post_blog', rejectUnauthenticated, (req, res) => {
  console.log('in post blog', req.user);
  console.log('POST BLOG_CONTENT:', req.body);
  let blog_content = req.body.blog_content;
  let blog_details = req.body.blog_details;

  let queryText = `INSERT INTO "blog_posts" ("title", "date", "blog_content", "person_id")
        VALUES ($1, $2, $3, $4);`;
  pool.query(queryText, [blog_details.title, blog_details.date, blog_content, req.user.id])
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
// router.delete('/:id', (req, res) => {
//   queryString = `DELETE FROM "item" WHERE "id" = $1;`;
//   let id = req.params.id
//   pool.query(queryString, [id])
//     .then(result => {
//       res.sendStatus(201);
//     }).catch(error => {
//       console.log('error in delete item:', error);
//       res.sendStatus(500);
//     })

// });

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