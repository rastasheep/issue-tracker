/**
 * @api {get} /issues Get issues
 * @apiName GetIssues
 * @apiGroup Issue
 * @apiDescription Get all issues
 *
 * @apiParam {Number} [page=1] Page of the issues collection
 * @apiParam {Number} [limit=10] Documents per page
 *
 * @apiSuccess (200) {Array} Array of issues
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
 * @api {get} /issues/:id Get single issue
 * @apiName GetIssue
 * @apiGroup Issue
 * @apiDescription Get issue with given :id with all of its files and with comment ids
 *
 * @apiParam {Number} id Issue id that needs to be deleted
 *
 * @apiSuccess (200) {String} status Status of the Issue
 * @apiSuccess (200) {String} createdAt Time of creation
 * @apiSuccess (200) {Number[]} files Issue file ids
 * @apiSuccess (200) {Number[]} comments Issue comment ids
 *
 * @apiNotFound (404) {String} message Not found info
 *
 * @apiError (500) {String} message Internal server error
 */
function get(request, h) {
  return 'noop';
}


/**
 * @api {post} /issues Create issue
 * @apiName CreateIssue
 * @apiGroup Issue
 * @apiDescription Create issue
 *
 * @apiHeader (RequestFileHeader) {String="application/json"} Content-Type
 *
 * @apiParam {String="pending","complete"} [status="pending"] Issue status
 *
 * @apiSuccess (201) {String} status Status of the Issue
 * @apiSuccess (201) {String} createdAt Time of creation
 * @apiSuccess (201) {Number[]} files Issue file ids
 * @apiSuccess (201) {Number[]} comments Issue comment ids
 *
 * @apiSuccess (400) {String} message Invalid value for status
 *
 * @apiError (500) {String} message Internal server error
 */
function create(request, h) {
  return 'noop';
}

/**
 * @api {patch} /issues/:id Update issue
 * @apiName UpdateIssue
 * @apiGroup Issue
 * @apiDescription Update the issue with given :id
 *
 * @apiHeader (Headers) {String="application/json"} Content-Type
 *
 * @apiParam {Number} id Issue id that needs to be deleted
 *
 * @apiParam {String="pending","complete"} [status="pending"] Issue status
 *
 * @apiSuccess (200) {String} status Status of the Issue
 * @apiSuccess (200) {String} createdAt Time of creation
 * @apiSuccess (200) {Number[]} files Issue file ids
 * @apiSuccess (200) {Number[]} comments Issue comment ids
 *
 * @apiNotFound (404) {String} message Not found info
 *
 * @apiError (500) {String} message Internal server error
 */
function update(request, h) {
  return 'noop';
}

/**
 * @api {delete} /issues/:id Delete issue
 * @apiName DeleteIssue
 * @apiGroup Issue
 * @apiDescription Delete the issue with :id
 *
 * @apiParam {Number} id Issue id that needs to be deleted
 *
 * @apiSuccess (200) {String} message Issue delete successfully info
 *
 * @apiNotFound (404) {String} message Not found info
 *
 * @apiError (500) {String} message Internal server error
 */
function destroy(request, h) {
  return 'noop';
}

module.exports = {
  index,
  get,
  create,
  update,
  destroy,
};
