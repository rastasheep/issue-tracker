const Attachment = require('../../../models/attachment');
const Issue = require('../../../models/issue');
const config = require('../../../config');

const ISSUE_NOT_FOUND = 'Issue not found';
const FILE_NOT_FOUND = 'File contents not found';

/**
 * @api {get} /attachments Get attachments
 * @apiName GetAttachments
 * @apiGroup Attachment
 * @apiDescription Get all attachments or the attachments for the issue with :_issue id
 *
 * @apiParam {Number} [_issue] Issue id that comment belongs to
 * @apiParam {Number} [page=1] Page of the issues collection
 * @apiParam {Number} [limit=10] Documents per page
 *
 * @apiSuccess (200) {Array} comments Array of attachments
 * @apiSuccess (PaginationResponseHeader) {String} x-total-count Number of total documents
 * @apiSuccess (PaginationResponseHeader) {String} x-total-pages Number of total pages
 * @apiSuccess (PaginationResponseHeader) {String} x-current-page Current page
 *
 * @apiError (500) {String} message Internal server error
 */
function index(request, h) {
  const filter = request.query._issue ? { _issue: request.query._issue } : {};

  return Attachment.paginate(filter, {
    page: Number(request.query.page) || 1,
    limit: Number(request.query.limit) || config.API_PER_PAGE,
  })
    .then(attachments => h.response(attachments.docs)
      .code(200)
      .header('X-Total-Count', attachments.total)
      .header('X-Total-Pages', attachments.pages)
      .header('X-Current-Page', attachments.page))
    .catch((err) => {
      console.log(err);
      return h.response({ message: 'Internal server error' }).code(500);
    });
}

/**
 * @api {get} /attachments/:id Get attachment
 * @apiParam {Number} id Attachment's unique ID
 * @apiName GetAttachment
 * @apiGroup Attachment

 * @apiDescription Get attachment with id :id
 * @apiSuccess (200) {String} Attachment's filename
 * @apiSuccess (200) {String} Issue's uniq ID
 *
 * @apiSuccess (404) {String} message Not found
 *
 * @apiError (500) {String} message Internal server error
 */
function get(request, h) {
  return Attachment.findOne({ _id: request.params.attachmentId })
    .then((attachment) => {
      if (!attachment) {
        return h.response({ message: 'Not found' }).code(404);
      }

      return h.response(attachment).code(200);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId' && err.name === 'CastError') {
        return h.response({ message: 'Not found' }).code(404);
      }

      console.log(err);
      return h.response({ message: 'Internal server error' }).code(500);
    });
}

/**
 * @api {post} /attachments Create attachment
 * @apiName CreateAttachment
 * @apiGroup Attachment
 * @apiDescription Upload attachment for specifcc issue with :issueId
 *
 * @apiHeader (Headers) {String="multipart/form-data"} Content-Type
 *
 * @apiParam {File} file Attachment's file
 * @apiParam {Number} issueId Issue's uniq ID
 *
 * @apiSuccess (200) {String} Attachment's filename
 * @apiSuccess (200) {String} Issue's uniq ID
 *
 * @apiError (500) {String} message Internal server error
 */
function create(request, h) {
  let issue;
  let attachment;
  const { file, _issue } = request.payload;

  return Issue.findOne({ _id: _issue })
    .then((foundIssue) => {
      issue = foundIssue;
      if (!issue) {
        throw new Error(ISSUE_NOT_FOUND);
      }

      if (!file) {
        throw new Error(FILE_NOT_FOUND);
      }

      return Attachment.create({
        _issue: _issue,
        _file: file.path.replace(config.FILE_STORAGE, ''),
        filename: file.filename,
      });
    })
    .then((createdAttachment) => {
      attachment = createdAttachment;
      issue.attachments.push(attachment);
      return issue.save();
    })
    .then(() => {
      delete attachment.path;
      return h.response(attachment).code(201);
    })
    .catch((err) => {
      switch (err.message) {
        case ISSUE_NOT_FOUND:
          return h.response({ message: 'Issue not found' }).code(400);
        case FILE_NOT_FOUND:
          return h.response({ message: 'File not found' }).code(400);
        default:
          console.log(err);
          return h.response({ message: 'Internal server error' }).code(500);
      }
    });
}

/**
 * @api {get} /files/:filename Download file
 * @apiParam {Number} filename File's uniq name
 * @apiName DownloadFile
 * @apiGroup Attachment

 * @apiDescription Get file with filename :filename
 * @apiSuccess (200) {Binary} File contents
 *
 * @apiSuccess (403) {String} message Forbiden
 *
 * @apiSuccess (404) {String} message Not found
 *
 * @apiError (500) {String} message Internal server error
 */

module.exports = {
  index,
  get,
  create,
};