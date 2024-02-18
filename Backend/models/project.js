const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  comment: {
    type: String,
  },
});

const projectSchema = new mongoose.Schema({
  project_holder: {
    type: String,
  },
  title: {
    type: String,
  },
  subject: {
    type: String,
  },
  description: {
    type: String,
  },
  tags: {
    type: [String],
    default: [],
  },
  photos: {
    type: [String],
    default: [],
  },
  shareable_links: {
    type: [String],
    default: [],
  },
  like: {
    type: Number,
  },
  dislike: {
    type: Number,
  },
  comments: [commentSchema],
});

const Project = mongoose.model("project", projectSchema);

module.exports = Project;
