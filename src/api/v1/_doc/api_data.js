define({ "api": [
  {
    "type": "post",
    "url": "/comments",
    "title": "Create comment",
    "name": "CreateComment",
    "group": "Comment",
    "description": "<p>Create comment for specified issue</p>",
    "header": {
      "fields": {
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": false,
            "field": "Content-Type",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "issueId",
            "description": "<p>Issue id that comment belongs to</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Comment text</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Comment text</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Time of creation</p>"
          },
          {
            "group": "201",
            "type": "Object",
            "optional": false,
            "field": "issue",
            "description": "<p>Issue that belongs to</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Comment text is too long maximum 250 chars</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal server error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/v1/comments/comments.controller.js",
    "groupTitle": "Comment"
  },
  {
    "type": "get",
    "url": "/comments",
    "title": "Get comments",
    "name": "GetComments",
    "group": "Comment",
    "description": "<p>Get all comments or the comments for the issue with :issueId id</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "issueId",
            "description": "<p>Issue id that comment belongs to</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>Page of the issues collection</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "defaultValue": "10",
            "description": "<p>Documents per page</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "comments",
            "description": "<p>Array of comments</p>"
          }
        ],
        "PaginationResponseHeader": [
          {
            "group": "PaginationResponseHeader",
            "type": "String",
            "optional": false,
            "field": "x-total-count",
            "description": "<p>Number of total documents</p>"
          },
          {
            "group": "PaginationResponseHeader",
            "type": "String",
            "optional": false,
            "field": "x-total-pages",
            "description": "<p>Number of total pages</p>"
          },
          {
            "group": "PaginationResponseHeader",
            "type": "String",
            "optional": false,
            "field": "x-current-page",
            "description": "<p>Current page</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal server error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/v1/comments/comments.controller.js",
    "groupTitle": "Comment"
  },
  {
    "type": "get",
    "url": "/files/:id",
    "title": "Get file",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>File's unique ID</p>"
          }
        ]
      }
    },
    "name": "DownloadFile",
    "group": "File",
    "description": "<p>Download file with id :id</p>",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "Binary",
            "description": "<p>file content</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Not found</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal server error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/v1/files/files.controller.js",
    "groupTitle": "File"
  },
  {
    "type": "post",
    "url": "/files",
    "title": "Upload a file for issue",
    "name": "UploadFile",
    "group": "File",
    "description": "<p>Upload files for specificc issue with :issueId and returns array of files ids</p>",
    "header": {
      "fields": {
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "allowedValues": [
              "\"multipart/form-data\""
            ],
            "optional": false,
            "field": "Content-Type",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File[]",
            "optional": false,
            "field": "files",
            "description": "<p>Array of uploading files</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "issueId",
            "description": "<p>Issue's uniq ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String[]",
            "optional": false,
            "field": "ids",
            "description": "<p>Array of uploaded files ids</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal server error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/v1/files/files.controller.js",
    "groupTitle": "File"
  },
  {
    "type": "post",
    "url": "/issues",
    "title": "Create issue",
    "name": "CreateIssue",
    "group": "Issue",
    "description": "<p>Create issue</p>",
    "header": {
      "fields": {
        "RequestFileHeader": [
          {
            "group": "RequestFileHeader",
            "type": "String",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": false,
            "field": "Content-Type",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"pending\"",
              "\"complete\""
            ],
            "optional": true,
            "field": "status",
            "defaultValue": "pending",
            "description": "<p>Issue status</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the Issue</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Time of creation</p>"
          },
          {
            "group": "201",
            "type": "Number[]",
            "optional": false,
            "field": "files",
            "description": "<p>Issue file ids</p>"
          },
          {
            "group": "201",
            "type": "Number[]",
            "optional": false,
            "field": "comments",
            "description": "<p>Issue comment ids</p>"
          }
        ],
        "400": [
          {
            "group": "400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Invalid value for status</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal server error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/v1/issues/issues.controller.js",
    "groupTitle": "Issue"
  },
  {
    "type": "delete",
    "url": "/issues/:id",
    "title": "Delete issue",
    "name": "DeleteIssue",
    "group": "Issue",
    "description": "<p>Delete the issue with :id</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Issue id that needs to be deleted</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Issue delete successfully info</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal server error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/v1/issues/issues.controller.js",
    "groupTitle": "Issue"
  },
  {
    "type": "get",
    "url": "/issues/:id",
    "title": "Get single issue",
    "name": "GetIssue",
    "group": "Issue",
    "description": "<p>Get issue with given :id with all of its files and with comment ids</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Issue id that needs to be deleted</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the Issue</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Time of creation</p>"
          },
          {
            "group": "200",
            "type": "Number[]",
            "optional": false,
            "field": "files",
            "description": "<p>Issue file ids</p>"
          },
          {
            "group": "200",
            "type": "Number[]",
            "optional": false,
            "field": "comments",
            "description": "<p>Issue comment ids</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal server error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/v1/issues/issues.controller.js",
    "groupTitle": "Issue"
  },
  {
    "type": "get",
    "url": "/issues",
    "title": "Get issues",
    "name": "GetIssues",
    "group": "Issue",
    "description": "<p>Get all issues</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>Page of the issues collection</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "defaultValue": "10",
            "description": "<p>Documents per page</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "Array",
            "description": "<p>of issues</p>"
          }
        ],
        "PaginationResponseHeader": [
          {
            "group": "PaginationResponseHeader",
            "type": "String",
            "optional": false,
            "field": "x-total-count",
            "description": "<p>Number of total documents</p>"
          },
          {
            "group": "PaginationResponseHeader",
            "type": "String",
            "optional": false,
            "field": "x-total-pages",
            "description": "<p>Number of total pages</p>"
          },
          {
            "group": "PaginationResponseHeader",
            "type": "String",
            "optional": false,
            "field": "x-current-page",
            "description": "<p>Current page</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal server error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/v1/issues/issues.controller.js",
    "groupTitle": "Issue"
  },
  {
    "type": "patch",
    "url": "/issues/:id",
    "title": "Update issue",
    "name": "UpdateIssue",
    "group": "Issue",
    "description": "<p>Update the issue with given :id</p>",
    "header": {
      "fields": {
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "allowedValues": [
              "\"application/json\""
            ],
            "optional": false,
            "field": "Content-Type",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Issue id that needs to be deleted</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"pending\"",
              "\"complete\""
            ],
            "optional": true,
            "field": "status",
            "defaultValue": "pending",
            "description": "<p>Issue status</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the Issue</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Time of creation</p>"
          },
          {
            "group": "200",
            "type": "Number[]",
            "optional": false,
            "field": "files",
            "description": "<p>Issue file ids</p>"
          },
          {
            "group": "200",
            "type": "Number[]",
            "optional": false,
            "field": "comments",
            "description": "<p>Issue comment ids</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Internal server error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/v1/issues/issues.controller.js",
    "groupTitle": "Issue"
  }
] });