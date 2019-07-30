const express = require('express');
const router = express.Router();
const {Client} = require ('pg');

const client = new Client({
  user: 'labber',
  host: 'localhost',
  password: 'password',
  database: 'midterm'
})

client.connect();

module.exports = (db) => {
  router.get("/", (request, response)=>{
    response.render('results')
  });

  // router.get('/:id', (req, res) => {
  //   client.query(`
  //     SELECT * from polls;
  //   `, (error, results) => {
  //     console.log('HERE HERE >>>>', results, error);
  //   });
  // });

  router.get("/:id", (request, response) => {
    client.query(
      `SELECT choices.title,choices.description, count(voters.*) as numberOfVoters
        FROM  voter_choices
        JOIN choices ON choices.id = voter_choices.choice_id
        JOIN polls ON polls.id = choices.poll_id
        JOIN voters ON polls.id = voters.poll_id

        WHERE polls.id = $1
        GROUP BY choices.title , choices.description
        ORDER BY sum(voter_choices.choice_rank) DESC`, [request.params.id],(error, results) => {
          if(error) {
            throw error;
          }
          response.render('results', {
            voterChoices: results.rows
          });
        }
    )

  });



  return router;
}


