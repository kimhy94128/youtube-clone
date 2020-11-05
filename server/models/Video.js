const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require("moment");

const videoSchema = mongoose.Schema({
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    maxlength:50
  },
  desctiption: {
    type: String,
  },
  privacy: {
    type: Number,
  },
  filePath: {
    type: String,
  },
  category: {
    type: String,
  },
  views: {
    type: Number,
    default: 0,
  },
  duration: {
    type: String,
  },
  thumbnail: {
    type: String
  }
}, { timestamps: true })

const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }