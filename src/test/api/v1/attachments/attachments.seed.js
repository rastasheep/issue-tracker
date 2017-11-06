const Attachment = require('../../../../models/attachment');

const seedAttachment = (issue) => {
  let attachment;

  if (!issue) {
    throw new Error('Issue required for seeding attachment');
  }

  const commentParams = {
    filename: 'text.txt',
    _file: '123',
    _issue: issue._id,
  };

  return Attachment.create(commentParams)
    .then((createdAttachment) => {
      attachment = createdAttachment;
      issue.attachments.push(attachment);

      return issue.save();
    })
    .then(() => attachment);
};

exports.seedAttachment = seedAttachment;
