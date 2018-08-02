const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: String,
  author: { type: mongoose.Schema.ObjectId, ref: 'User' },
  image: { type: String, required: true },
  content: String,
  readingTime: Number,
  likes: Number,
  comments: [{createdBy: {type: mongoose.Schema.ObjectId, ref: 'User'}, content: String}]
}, {timestamps: true});



module.exports = mongoose.model('Post', postSchema);
