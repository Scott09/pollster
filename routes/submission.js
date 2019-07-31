const express = require('express');
const router = express.Router({mergeParams: true});
const { getPollAndChoicesByID, submitPollVote } = require('../db/database');
const { pool } = require('../lib/db');


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
  submitPollVote(req.params.poll_id, req.body.name, req.body.choices.split(',')).then(() => {
    resp.send("ok");
  }).catch(err => {
    throw new Error(err);
  });
});



module.exports = router;

//solve :poll_id route dynamicism
