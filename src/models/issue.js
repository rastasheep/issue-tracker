const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const issueSchema = new mongoose.Schema({
  status: {
    type: String,
    default: 'pending',
  },
}, {
  timestamps: true,
});

issueSchema.plugin(mongoosePaginate);

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
