const pool = require('../lib/db');


//Links???
const addPoll = function(poll) {
  return new Promise((resolve,reject) => {
    pool.query(
      `INSERT INTO polls (owner_name, owner_email, question)
      VALUES (${poll.owner_name},${poll.owner_email},${polls.question})
      RETURNING *;`)
      .then((result) => {
        resolve(result.row[0]);
      });
  });
};

exports.addPoll = addPoll;


const addVoter = function(voter) {
  return new Promise((resolve, reject) =>{
    pool.query(
      `INSERT INTO voters (
        name, polls_id )
        VALUES (${voter.name}, ${voter.polls_id})
      RETURNING *;`)
      .then((result) => {
        resolve(result.row[0]);
      });
  });
};
exports.addVoter = addVoter;

const addVote = function(vote) {
  return new Promise((resolve, reject) =>{
    pool.query(
      `INSERT INTO votes (voter_id,choice_id, rank)
      VALUES (${vote.voter_id}, ${vote.choice_id},${vote.rank})
      RETURNING *;`)
      .then((result) => {
        resolve(result.row[0]);
      });
  });
};

exports.addVote = addVote;

const addChoice = function(choice) {
  return new Promise((resolve, reject) =>{
    pool.query(
      `INSERT INTO  choices ( poll_id,description, title)
      VALUES (${choice.poll_id}, ${choice.description},${choice.title})
      RETURNING *;`)
      .then((result) => {
        resolve(result.row[0]);
      });
  });
};

exports.addChoice = addChoice;
const util = require('util');

const getPollAndChoicesByID = function(id) {
  return pool.query(`SELECT * FROM polls WHERE id = ${id}`)
    .then((poll) => {
      return pool.query(`SELECT * FROM choices WHERE poll_id = ${id}`)
        .then(choices => {
        // {choices} == {choices: choices}
          let result = {};
          Object.assign(result, poll.rows[0], { choices: [] });
          for (let choice of choices.rows) {
            result.choices.push(Object.assign({}, choice));
          }
          console.log(result);
          return result;
        });
    });
};

exports.getPollAndChoicesByID = getPollAndChoicesByID;

const submitPollVote = function(pollID, voterName, choices) {
  return pool.query(`INSERT INTO voters (poll_id, name) VALUES ($1, $2)RETURNING id`, [pollID, voterName])
    .then(voter => {
      let voterID = voter.rows[0].id;
      let insertions = [];
      let count = 3;
      for (let i = 0; i < choices.length; ++i) {
        insertions.push(pool.query(`INSERT INTO voter_choices (voter_id, choice_id, choice_rank) VALUES ($1, $2, $3)`, [voterID, choices[i], count - i]));
      }
      return Promise.all(insertions);
    });
};

exports.submitPollVote = submitPollVote;

