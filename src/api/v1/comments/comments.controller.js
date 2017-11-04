/**
 * @api {get} /comments Get comments
 * @apiName GetComments
 * @apiGroup Comment
 * @apiDescription Get all comments or the comments for the issue with :issueId id
 *
 * @apiParam {Number} [issueId] Issue id that comment belongs to
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
  return 'noop';
}

/**
 * @api {post} /comments Create comment
 * @apiName CreateComment
 * @apiGroup Comment
 * @apiDescription Create comment for specified issue
 *
 * @apiHeader (Headers) {String="application/json"} Content-Type
 *
 * @apiParam {Number} issueId Issue id that comment belongs to
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
  return 'noop';
}

module.exports = {
  index,
  create,
};
