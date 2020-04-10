const express = require("express");
const app = express();
const studentRoute = express.Router();
const jwt = require("jsonwebtoken");
const config = require("../config");

// Student model
let Student = require("../model/Student");

// Register Student
studentRoute.route("/register").post((req, res, next) => {
  Student.findOne({ email: req.body.email }, function (err, data) {
    if (err) {
      return next(err);
    } else if (data) {
      console.log("Email has already been taken", data);
      res.status(409);
      res.json({});
    } else {
      Student.create(req.body, (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.json(data);
        }
      });
    }
  });
});

// Get all student
studentRoute.route("/").get((req, res) => {
  Student.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get single student
studentRoute.route("/login").post((req, res) => {
  console.log("Recieved req", req.body);
  Student.findOne({ email: req.body.email }, (error, data) => {
    console.log("Found req", data);
    if (!data) {
      res.status(404);
      res.json({});
    } else if (data.password !== req.body.password) {
      res.status(401);
      res.json({});
    } else if (error) {
      return next(error);
    } else {
      const user = { userName: data.userName, email: data.email };
      const token = jwt.sign(user, config.secret, {
        expiresIn: 86400, // expires in 24 hours
      });
      res.json({ ...user, token: token });
    }
  });
});

// Update student
studentRoute.route("/update-student/:id").put((req, res, next) => {
  Student.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("Student successfully updated!");
      }
    }
  );
});

// Delete student
studentRoute.route("/delete-student/:id").delete((req, res, next) => {
  Student.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = studentRoute;
