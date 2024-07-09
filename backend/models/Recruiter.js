const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const Recruiterschema = new Schema({
  name: {
    type: String,
    required: [true, "Name required"],
  },
  email: {
    type: String,
    required: [true, "E-mail ID  required"],
    unique: [true, "E-mail Already in use"],
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password required"],
  },
  contact: {
    type: String,
    required: [true, "Contact information required"],
  },
  bio: {
    type: String,
    maxlength: [250, "Max length of bio is 250 characters"],
    minlength: [1, "Atleast one character is required in the Bio"],
  },
});

module.exports = Recruiter = mongoose.model("Recruiter", Recruiterschema);
