var express = require("express");

var router = express.Router();

var burgers = require("../models/burger.js");

router.get("/", function (req, res) {
  burgers.selectAll(function (data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/burgers", function (req, res) {
  burgers.insertOne([
    "burger_name"
  ], [
      req.body.burger_name
    ], function (result) {
      res.redirect("/");
    });
});

router.put("/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  burgers.updateOne({
    devoured: req.body.devoured
  }, condition, function (result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.redirect("/");
      res.status(200).end();
    }

  });
});

module.exports = router


//.then???