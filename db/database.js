// const {pool} = require ('pg');

// const pool = new pool ({
//   user: 'labber',
//   host: 'localhost',
//   password: 'password',
//   database: 'midterm'
// })

// pool.connect();


//Links???
const addPoll = function(poll) {
  return new Promise((resolve,reject) => {
    pool.query(
      `INSERT INTO polls (owner_name, owner_email, question)
      VALUES (${poll.owner_name},${poll.owner_email},${polls.question})
      RETURNING *;`)
    .then((result) => {
      resolve(result.row[0])
    })
  })
}

exports.addPoll = addPoll;


const addVoter = function(voter) {
  return new Promise((resolve, reject) =>{
    pool.query(
      `INSERT INTO voters (
        name, polls_id )
        VALUES (${voter.name}, ${voter.polls_id})
      RETURNING *;`)
      .then((result) => {
        resolve(result.row[0])
      })
  })
}
exports.addVoter = addVoter;

const addVote = function(vote) {
  return new Promise((resolve, reject) =>{
    pool.query(
      `INSERT INTO votes (voter_id,choice_id, rank)
      VALUES (${vote.voter_id}, ${vote.choice_id},${vote.rank})
      RETURNING *;`)
      .then((result) => {
        resolve(result.row[0])
      })
  })
}

exports.addVote = addVote;

const addChoice = function(choice) {
  return new Promise((resolve, reject) =>{
    pool.query(
      `INSERT INTO  choices ( poll_id,description, title)
      VALUES (${choice.poll_id}, ${choice.description},${choice.title})
      RETURNING *;`)
      .then((result) => {
        resolve(result.row[0])
      })
  })
}

exports.addChoice = addChoice;
