const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const util = require("../util");

let DateCell = require("../model/DateCell.js");
let Task = require("../model/Task.js");
let Event = require("../model/Event.js");
let Holiday = require("../model/Holiday.js");

// Get Tasks
router.get("/", function (req, res, next) {
  const user = req.user;
  Task.find({ userId: user.id }, (err, products) => {
    if (err) return next(err);
    res.json(products);
  });
});

// Get Tasks for a Month
router.get("/by-month/:date", function (req, res, next) {
  console.log("calendar by month Recieve req:", req.params.date);
  console.log("Recieve user:", req.user);
  console.log(
    "Start DATE:",
    new Date(new Date().getFullYear(), new Date().getMonth())
  );
  console.log(
    "END DATE:",
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
  );
  const user = req.user;
  const date = req.params.date;
  //* Start Collection Chain - TASKS
  Task.find(
    {
      userId: user.id,
      date: {
        $gte: new Date(new Date(date).getFullYear(), new Date(date).getMonth()),
        $lte: new Date(
          new Date(date).getFullYear(),
          new Date(date).getMonth() + 1,
          0
        ),
      },
    },
    (err, tasks) => {
      if (err) return next(err);
      console.log("event called");
      //* 2nd Collection Chain - EVENTS
      Event.find(
        {
          userId: user.id,
          date: {
            $gte: new Date(
              new Date(date).getFullYear(),
              new Date(date).getMonth()
            ),
            $lte: new Date(
              new Date(date).getFullYear(),
              new Date(date).getMonth() + 1,
              0
            ),
          },
        },
        (err, events) => {
          if (err) return next(err);
          console.log("holiday called");
          // * 3rd Collection Chain - HOLIDAYS
          Holiday.find(
            {
              userId: user.id,
              date: {
                $gte: new Date(
                  new Date(date).getFullYear(),
                  new Date(date).getMonth()
                ),
                $lte: new Date(
                  new Date(date).getFullYear(),
                  new Date(date).getMonth() + 1,
                  0
                ),
              },
            },
            (err, holidays) => {
              if (err) return next(err);
              let dateCells = [];
              tasks.forEach((task) => {
                const dc = dateCells.find(
                  (d) => d.date.getTime() === task.date.getTime()
                );
                if (dc) dc.taskCount++;
                else dateCells.push(new DateCell(task.date, 1, 0, 0));
              });
              console.log("event going to loop", events);
              events.forEach((event) => {
                const dc = dateCells.find(
                  (d) => d.date.getTime() === event.date.getTime()
                );
                if (dc) dc.eventCount++;
                else dateCells.push(new DateCell(event.date, 0, 1, 0));
              });
              holidays.forEach((holiday) => {
                const dc = dateCells.find(
                  (d) => d.date.getTime() === holiday.date.getTime()
                );
                if (dc) dc.holidayCount++;
                else dateCells.push(new DateCell(holiday.date, 0, 0, 1));
              });
              console.log("datecells", dateCells);
              res.json(dateCells);
            }
          );
        }
      );
    }
  );
});
//   }).countDocuments((err, count) => {
//     if (err) return next(err);
//     console.log("Count:", count);
//     res.json(count);
//   });
// });

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
  console.log("update recieved", req.body);
  Task.findByIdAndUpdate(req.body._id, req.body, function (err, post) {
    console.log("post", post);
    if (err) return next(err);
    res.json(post);
  });
});

// Delete Task
router.delete("/delete/:id", function (req, res, next) {
  console.log(req.params.id);
  Task.findByIdAndRemove({ _id: req.params.id }, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
