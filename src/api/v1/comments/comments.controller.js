const Comment = require('../../../models/comment');
const Issue = require('../../../models/issue');
const config = require('../../../config');

const ISSUE_NOT_FOUND = 'Issue not found';

/**
 * @api {get} /comments Get comments
 * @apiName GetComments
 * @apiGroup Comment
 * @apiDescription Get all comments or the comments for the issue with :_issue id
 *
 * @apiParam {Number} [_issue] Issue id that comment belongs to
 * @apiParam {Number} [page=1] Page of the issues collection
 * @apiParam {Number} [limit=10] Documents per page
 *
 * @apiSuccess (200) {Array} comments Array of comments
 * @apiSuccess (PaginationResponseHeader) {String} x-total-count Number of total documents
 * @apiSuccess (PaginationResponseHeader) {String} x-total-pages Number of total pages
 * @apiSuccess (PaginationResponseHeader) {String} x-current-page Current page
 *
 * @apiError (500) {String} message Internal server error
 */
function index(request, h) {
  const filter = request.query._issue ? { _issue: request.query._issue } : {};

  return Comment.paginate(filter, {
    page: Number(request.query.page) || 1,
    limit: Number(request.query.limit) || config.API_PER_PAGE,
  })
    .then(comments => h.response(comments.docs)
      .code(200)
      .header('X-Total-Count', comments.total)
      .header('X-Total-Pages', comments.pages)
      .header('X-Current-Page', comments.page))
    .catch((err) => {
      console.log(err);
      return h.response({ message: 'Internal server error' }).code(500);
    });
}

/**
 * @api {post} /comments Create comment
 * @apiName CreateComment
 * @apiGroup Comment
 * @apiDescription Create comment for specified issue
 *
 * @apiHeader (Headers) {String="application/json"} Content-Type
 *
 * @apiParam {Number} _issue Issue id that comment belongs to
 * @apiParam {String} text Comment text
 *
 * @apiSuccess (201) {String} text Comment text
 * @apiSuccess (201) {String} createdAt Time of creation
 * @apiSuccess (201) {Object} issue Issue that belongs to
 *
 * @apiError (400) {String} message Comment text is too long maximum 250 chars
 * @apiError (400) {String} message Comment text cannot be blank
 *
 * @apiError (500) {String} message Internal server error
 */
function create(request, h) {
  let issue;
  let comment;

  return Issue.findOne({ _id: request.payload._issue })
    .then((foundIssue) => {
      issue = foundIssue;

      if (!issue) {
        throw new Error(ISSUE_NOT_FOUND);
      }
      return Comment.create(request.payload);
    })
    .then((createdComment) => {
      comment = createdComment;
      issue.comments.push(comment);

      return issue.save();
    })
    .then(() => h.response(comment).code(201))
    .catch((err) => {
      if (err.message === ISSUE_NOT_FOUND) {
        return h.response({ message: 'Issue not found' }).code(400);
      }

      console.log(err);
      return h.response({ message: 'Internal server error' }).code(500);
    });
}

module.exports = {
  index,
  create,
};
