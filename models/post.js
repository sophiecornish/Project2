const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: String,
  author: { type: mongoose.Schema.ObjectId, ref: 'User' },
  image: { type: String, required: true },
  content: String,
  date: String,
  readingTime: Number,
  likes: Number,
  comments: [{name: String, content: String}]
});



module.exports = mongoose.model('Post', postSchema);
