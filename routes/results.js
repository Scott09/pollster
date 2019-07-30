const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (request, response)=>{
    response.render('results')
  });

  router.get("/:id", (request, response) => {
    db.query(
      `SELECT choices.title,choices.description, count(voters.poll_id) as voterNumber
        FROM  voter_choices
        JOIN choices ON choices.id = voter_choices.choice_id
        JOIN polls ON polls.id = choices.poll_id
        RIGHT JOIN voters ON polls.id = voters.poll_id
        WHERE polls.id = $1
        GROUP BY choices.title , choices.description
        ORDER BY sum(voter_choices.choice_rank) DESC`, [request.params.id],(error, results) => {
          if(error) {
            throw error;

          }
          db.query(`SELECT count(voters.name) as count
          FROM voters
          JOIN polls
          ON polls.id = voters.poll_id
          WHERE polls.id = $1`, [request.params.id], (error, data) => {
            if (error) {
              throw error;
            }
            response.render('results', {
              voterChoices: results.rows,
              voterNumber: data.rows[0].count
          })

          });
        }
    )
  });

  return router;
}



function Copy()
      {
          var Url = document.createElement("textarea");
          Url.innerHTML = window.location.href;
          Copied = Url.createTextRange();
          Copied.execCommand("Copy");
      }
exports.Copy = Copy;



