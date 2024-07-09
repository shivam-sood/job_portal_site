const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ApplicantSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name required"],
  },
  email: {
    type: String,
    required: [true, "E-mail ID  required"],
    unique: [true, "E-mail Already in use"],
    lowercase: true,
    trim:true,
  },
  password: {
    type: String,
    required: [true, "Password required"],
  },
  education: [
    {
      name: {
        type: String,
        required: [true, "Institute required"],
      },
      start: {
        type: Date,
        required: [true, "Starting date required"],
      },
      end: {
        type: Date,
      },
    },
  ],
  skills: {
    type: [String],
    required: [true, "Skills required"],
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

module.exports = Applicant = mongoose.model("Applicant", ApplicantSchema);
