module.exports = app =>{
    const crawler = require("../controllers/crawler.controller.js");

    var router = require("express").Router();
  
    // Create a new Tutorial
    router.get("/:numPage", crawler.crawler);
  
    app.use('/api/crawler', router);
};