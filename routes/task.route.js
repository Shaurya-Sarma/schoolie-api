const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

let Task = require("../model/Task.js");

// Get Tasks
router.get("/", function (req, res, next) {
  Task.find({ userId: "5e811863a468065068ced0f4" }, (err, products) => {
    if (err) return next(err);
    res.json(products);
  });
});

// Get Tasks for a Day
router.get("/by-day/:date", function (req, res, next) {
  console.log("Recieve req:", req.params.date);
  Task.find(
    { userId: "5e811863a468065068ced0f4", date: req.params.date },
    (err, tasks) => {
      if (err) return next(err);
      res.json(tasks);
    }
  );
});

// Get One Task By ID
router.get("/:id", function (req, res, next) {
  Task.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// Save New Task
router.post("/", function (req, res, next) {
  Task.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// Update Task
router.put("/:id", function (req, res, next) {
  Task.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// Delete Task
router.delete("/:id", function (req, res, next) {
  Task.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
