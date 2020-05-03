const express = require("express");
const router = express.Router();

let Note = require("../model/Note.js");

// Get Notes
router.get("/", function (req, res, next) {
  const user = req.user;
  Note.find({ userId: user.id }, { data: 0 }, (err, notes) => {
    if (err) return next(err);
    res.json(notes);
  });
});

// Get One Note By ID
router.get("/:id", function (req, res, next) {
  Note.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// Save New Note
router.route("/").post(function (req, res, next) {
  req.body = { ...req.body, userId: req.user.id };
  Note.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// Update Note
router.put("/", function (req, res, next) {
  Note.findByIdAndUpdate(req.body._id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// Delete Note
router.delete("/delete/:id", function (req, res, next) {
  Note.findByIdAndRemove({ _id: req.params.id }, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
