const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (request, response) => {
    response.render("index");
  });
  router.post("/", (request, response) => {
    console.log("Posting on polls");
    response.redirect("results");
  });

  return router;
};
