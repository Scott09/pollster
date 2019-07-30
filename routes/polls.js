const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/new", (request, response) => {
    response.render("index");
  });
  router.post("/new", (request, response) => {
    console.log("Posting on polls");
    response.render("index");
  });


  

  return router;
};
