const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (request, response)=>{
    response.render('results')
  });

  router.get("/:url", (request, response) => {

  });
  return router;
}
