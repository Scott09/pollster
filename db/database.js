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

const getPollAndChoicesByID = function(id) {
  return pool.query(`SELECT * FROM polls WHERE id = $1`, [id])
    .then((poll) => {
      return pool.query(`SELECT * FROM choices WHERE poll_id = $1`, [poll.id])
        .then(choices => {
        // {choices} == {choices: choices}
          return Object.assign({}, poll.row[0], { choices });
        });
    });
};

exports.getPollAndChoicesByID = getPollAndChoicesByID;
