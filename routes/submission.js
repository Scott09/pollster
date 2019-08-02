const express = require('express');
const router = express.Router({mergeParams: true});
const { getPollAndChoicesByID, submitPollVote } = require('../db/database');
const { pool } = require('../lib/db');
const { mailgunSubmit } = require('../lib/mail');


router.get("/new", (req, resp) => {
  getPollAndChoicesByID(req.params.poll_id)
    .then(poll => {
      resp.render('../views/submission.ejs', {poll});
    })
    .catch(err => {
      throw new Error(err);
    });
});

router.post("/", (req, resp) => {
  submitPollVote(req.params.poll_id, req.body.name, req.body.choices.split(','))
    .then(() => getPollAndChoicesByID(req.params.poll_id))
    .then(poll => {
      //console.log(poll);
      return mailgunSubmit(poll.creator_email, `http://localhost:8080/poll/${req.params.poll_id}/results`);
    })
    .then(() => {
      resp.redirect(`/results/${req.params.poll_id}`);
    }).catch(err => {
      console.trace(err);
    });
  //});

});



module.exports = router;

//solve :poll_id route dynamicism
