const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (request, response) => {
    response.render("index");
  });
  
  return router;
};