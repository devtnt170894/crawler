module.exports = app => {
  const news = require("../controllers/news.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", news.create);
  router.get("/", news.findAll);
  router.get("/:maTin", news.findAllByID);

  app.use('/api/news', router);
};