const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

let Holiday = require("../model/Holiday.js");

// Get Holidays
router.get("/", function (req, res, next) {
  const user = req.user;
  Holiday.find({ userId: user.id }, (err, products) => {
    if (err) return next(err);
    res.json(products);
  });
});

// Get Holidays for a Day
router.get("/by-date/:date", function (req, res, next) {
  console.log("Recieve req:", req.params.date);
  console.log("Recieve user:", req.user);
  const date = new Date(req.params.date);
  const user = req.user;

  Holiday.find({ userId: user.id, date: date }, (err, holidays) => {
    if (err) return next(err);
    res.json(holidays);
  });
});

// Get One Holiday By ID
router.get("/:id", function (req, res, next) {
  Holiday.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// Save New Holiday
router.route("/").post(function (req, res, next) {
  req.body = { ...req.body, userId: req.user.id };
  Holiday.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// Update Holiday
router.put("/", function (req, res, next) {
  console.log("update recieved", req.body);
  Event.findByIdAndUpdate(req.body._id, req.body, function (err, post) {
    console.log("post", post);
    if (err) return next(err);
    res.json(post);
  });
});

// Delete Holiday
router.delete("/delete/:id", function (req, res, next) {
  console.log(req.params.id);
  Holiday.findByIdAndRemove({ _id: req.params.id }, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
