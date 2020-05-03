const express = require("express");
const router = express.Router();

let Event = require("../model/Event.js");

// Get Events
router.get("/", function (req, res, next) {
  const user = req.user;
  Event.find({ userId: user.id }, (err, products) => {
    if (err) return next(err);
    res.json(products);
  });
});

// Get Events for a Day
router.get("/by-date/:date", function (req, res, next) {
  const date = new Date(req.params.date);
  const user = req.user;

  Event.find({ userId: user.id, date: date }, (err, events) => {
    if (err) return next(err);
    res.json(events);
  });
});

// Get One Event By ID
router.get("/:id", function (req, res, next) {
  Event.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// Save New Event
router.route("/").post(function (req, res, next) {
  req.body = { ...req.body, userId: req.user.id };
  Event.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// Update Event
router.put("/", function (req, res, next) {
  Event.findByIdAndUpdate(req.body._id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// Delete Event
router.delete("/delete/:id", function (req, res, next) {
  Event.findByIdAndRemove({ _id: req.params.id }, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
