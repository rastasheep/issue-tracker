/**
 * @api {get} /files/:id Get file
 * @apiParam {Number} id File's unique ID
 * @apiName DownloadFile
 * @apiGroup File

 * @apiDescription Download file with id :id
 * @apiSuccess (200) {Number} Binary file content
 *
 * @apiSuccess (404) {String} message Not found
 *
 * @apiError (500) {String} message Internal server error
 */
function get(request, h) {
  return 'noop';
}

/**
 * @api {post} /files Upload a file for issue
 * @apiName UploadFile
 * @apiGroup File
 * @apiDescription Upload files for specificc issue with :issueId and returns array of files ids
 *
 * @apiHeader (Headers) {String="multipart/form-data"} Content-Type
 *
 * @apiParam {File[]} files Array of uploading files
 * @apiParam {Number} issueId Issue's uniq ID
 *
 * @apiSuccess (200) {String[]} ids Array of uploaded files ids
 *
 * @apiError (500) {String} message Internal server error
 */
function create(request, h) {
  return 'noop';
}

module.exports = {
  get,
  create,
};
