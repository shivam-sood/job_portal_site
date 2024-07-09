const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ApplicationSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title of job required"],
  },
  date_of_joining: {
    type: Date,
    required: false,
    default: Date.now(),
  },
  date_of_application: {
    type: Date,
    required: false,
    default: Date.now(),
  },
  salary: {
    type: Number,
    min: 0,
  },
  name: {
    type: String,
    required: [true, "Name of job provider required"],
  },
  applicant_name: {
    type: String,
    required: [true, "Name of job seeker required"],
  },
  recruiter_email: {
    type: String,
    required: [true, "E-mail ID  required"],
  },
  applicant_email: {
    type: String,
    required: [true, "E-mail ID  required"],
  },
  status: {
    type: String,
    enum: ["Accepted", "Rejected", "Shortlisted", "Applied"],
    required: true,
  },
  sop: {
    type: String,
    maxlength: [250, "Max length of bio is 250 characters"],
    minlength: [1, "Atleast one character is required in the Bio"],
    required: true,
  },
  type: {
    type: String,
    enum: ["Full-time", "Part-time", "Work from Home"],
  },
});

module.exports = Application = mongoose.model("Application", ApplicationSchema);
