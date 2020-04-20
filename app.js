let express = require("express"),
  path = require("path"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  dataBaseConfig = require("./database/db"),
  util = require("./util");

// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose
  .connect(dataBaseConfig.db, {
    useNewUrlParser: true,
  })
  .then(
    () => {
      console.log("Database connected sucessfully ");
    },
    (error) => {
      console.log("Could not connected to database : " + error);
    }
  );

// Set up express js port
const studentRoute = require("./routes/student.route");
const taskRoute = require("./routes/task.route");
const calendarRoute = require("./routes/calendar.route");
const eventRoute = require("./routes/event.route");
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());
app.use(express.static(path.join(__dirname, "static")));
app.use("/", express.static(path.join(__dirname, "static")));
app.use("/api/users/", studentRoute);
app.use(util);
app.use("/api/tasks/", taskRoute);
app.use("/api/calendar/", calendarRoute);
app.use("/api/events/", eventRoute);

// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});

// Find 404 and hand over to error handler
//app.use((req, res, next) => {
//next(new Error(404));
//});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
