const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/new", (request, response) => {
    response.render("index");
  });

  let choicePollId = null;

  router.post("/new", (request, response) => {

    let insertPollString = `INSERT INTO polls (creator_name, creator_email, question) VALUES ($1, $2, $3) RETURNING *`;

    let insertVoter = `INSERT INTO voters (name, poll_id) VALUES ($1, $2)`;

    let insertChoice = `INSERT INTO choices (poll_id, description, title) VALUES ($1, $2, $3)`;

    db.query(insertPollString, [request.body.name, request.body.email, request.body.question], (error, results) => {
      if (error) {
        throw error;
      }
      choicePollId = results.rows[0].id;
      db.query(insertVoter, [request.body.name, results.rows[0].id], (error, results) => {
        if (error) {
          throw error;
        }
        db.query(insertChoice, [choicePollId, 'description', request.body.question1], (error, results) => {
          if (error) {
            throw error;
          }
          db.query(insertChoice, [choicePollId, 'description2', request.body.question2], (error, results) => {
            if (error) {
              throw error;
            } 
            db.query(insertChoice, [choicePollId, 'description3', request.body.question3], (error, results) => {
              if (error) {
                throw error;
              }
              response.render("index");
            })
          })
        })
      
      });
    });
  });

  return router;
};
