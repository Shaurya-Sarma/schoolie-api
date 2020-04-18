module.exports = class DateCell {
  constructor(date, taskCount, eventCount, holidayCount) {
    this.date = date;
    this.taskCount = taskCount;
    this.eventCount = eventCount;
    this.holidayCount = holidayCount;
  }
};
