const Comment = require('../../../../models/comment');

const seedComment = (issue) => {
  if (!issue) {
    throw new Error('Issue required for seeding comment');
  }

  const commentParams = {
    text: 'Foo bar baz',
    _issue: issue._id,
  };

  return Comment.create(commentParams)
    .then((comment) => {
      issue.comments.push(comment);

      return issue.save();
    });
};

exports.seedComment = seedComment;
