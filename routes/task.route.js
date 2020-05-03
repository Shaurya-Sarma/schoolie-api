const express = require("express");
const router = express.Router();

let Task = require("../model/Task.js");

// Get Tasks
router.get("/", function (req, res, next) {
  const user = req.user;
  Task.find({ userId: user.id }, (err, products) => {
    if (err) return next(err);
    res.json(products);
  });
});

// Get Tasks for a Day
router.get("/by-day/:date", function (req, res, next) {
  const date = new Date(req.params.date);
  const user = req.user;

  Task.find({ userId: user.id, date: date }, (err, tasks) => {
    if (err) return next(err);
    res.json(tasks);
  });
});

// Get One Task By ID
router.get("/:id", function (req, res, next) {
  Task.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// Save New Task
router.route("/").post(function (req, res, next) {
  req.body = { ...req.body, userId: req.user.id };
  Task.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// Update Task
router.put("/", function (req, res, next) {
  Task.findByIdAndUpdate(req.body._id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// Delete Task
router.delete("/delete/:id", function (req, res, next) {
  Task.findByIdAndRemove({ _id: req.params.id }, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
