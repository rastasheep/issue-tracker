const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    maxlength: 250,
    match: /[^\s-]/,
  },
  _issue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Issue',
  },
}, {
  timestamps: true,
});

commentSchema.plugin(mongoosePaginate);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
