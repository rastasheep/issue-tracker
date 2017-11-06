const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const attachmentSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  _file: {
    type: String,
    required: true,
  },
  _issue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Issue',
  },
}, {
  timestamps: true,
});

attachmentSchema.plugin(mongoosePaginate);

const Attachment = mongoose.model('Attachment', attachmentSchema);

module.exports = Attachment;
