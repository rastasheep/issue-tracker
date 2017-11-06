const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const issueSchema = new mongoose.Schema({
  status: {
    type: String,
    default: 'pending',
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  attachments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attachment',
  }],
}, {
  timestamps: true,
});

issueSchema.plugin(mongoosePaginate);

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
