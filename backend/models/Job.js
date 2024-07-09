const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const JobSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title of job required"],
  },
  name: {
    type: String,
    required: [true, "Name of job provider required"],
  },
  email: {
    type: String,
    required: [true, "E-mail ID of job provider required"],
  },
  applications: {
    type: Number,
    min: [0, "Can't have negative number of application spots"],
  },
  positions: {
    type: Number,
    min: [0, "Can't have negative number of positions"],
  },
  date_of_post: {
    type: Date,
    required: false,
    default: Date.now(),
  },
  deadline: {
    type: Date,
    required: [true, "Deadline date for applications required"],
  },
  skills: {
    type: [String],
  },
  type: {
    type: String,
    enum: ["Full-time", "Part-time", "Work from Home"],
  },
  duration: {
    type: Number,
    min: 0,
    max: 6,
  },
  salary: {
    type: Number,
    min: 0,
  },
  rating: {
    given: {
      type: Number,
    },
    total: {
      type: Number,
    },
  },
});

module.exports = Job = mongoose.model("Job", JobSchema);
