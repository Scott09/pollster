const express = require('express');
const router = express.Router();
const { getPollAndChoicesByID } = require('../db/database');

router.get("/new", (req, resp) => {
  getPollAndChoicesByID(req.params.poll_id)
    .then(poll => {
      console.log(poll);
      resp.render('../views/submission.ejs', {poll});
    })
    .catch(err => { throw new Error(err)});
});

module.exports = router;
