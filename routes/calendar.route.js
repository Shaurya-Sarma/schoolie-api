const express = require("express");
const router = express.Router();

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
              res.json(dateCells);
            }
          );
        }
      );
    }
  );
});

module.exports = router;
