define({ "api": [
  {
    "type": "post",
    "url": "/api/v1/attachments",
    "title": "Create attachment",
    "name": "CreateAttachment",
    "group": "Attachment",
    "description": "<p>Upload attachment for specifcc issue with :issueId</p>",
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
            "type": "File",
            "optional": false,
            "field": "file",
            "description": "<p>Attachment's file</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_issue",
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
            "type": "String",
            "optional": false,
            "field": "filename",
            "description": "<p>Attachment's filename</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "_file",
            "description": "<p>Issue's uniq ID</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "_issue",
            "description": "<p>Issue's uniq ID</p>"
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
    "filename": "src/api/v1/attachments/attachments.controller.js",
    "groupTitle": "Attachment"
  },
  {
    "type": "get",
    "url": "/api/v1/files/:filename",
    "title": "Download file",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "filename",
            "description": "<p>File's uniq name</p>"
          }
        ]
      }
    },
    "name": "DownloadFile",
    "group": "Attachment",
    "description": "<p>Get file with filename :filename</p>",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "File",
            "optional": false,
            "field": "body",
            "description": "<p>File contents</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Forbiden</p>"
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
    "filename": "src/api/v1/attachments/attachments.controller.js",
    "groupTitle": "Attachment"
  },
  {
    "type": "get",
    "url": "/api/v1/attachments/:id",
    "title": "Get attachment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Attachment's unique ID</p>"
          }
        ]
      }
    },
    "name": "GetAttachment",
    "group": "Attachment",
    "description": "<p>Get attachment with id :id</p>",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "filename",
            "description": "<p>Attachment's file name</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "_file",
            "description": "<p>Attachment's uniq file id</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "_issue",
            "description": "<p>Issue's uniq ID</p>"
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
    "filename": "src/api/v1/attachments/attachments.controller.js",
    "groupTitle": "Attachment"
  },
  {
    "type": "get",
    "url": "/api/v1/attachments",
    "title": "Get attachments",
    "name": "GetAttachments",
    "group": "Attachment",
    "description": "<p>Get all attachments or the attachments for the issue with :_issue id</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "_issue",
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
            "type": "Object[]",
            "optional": false,
            "field": "body",
            "description": "<p>Array of attachments</p>"
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
    "filename": "src/api/v1/attachments/attachments.controller.js",
    "groupTitle": "Attachment"
  },
  {
    "type": "post",
    "url": "/api/v1/comments",
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
            "type": "String",
            "optional": false,
            "field": "_issue",
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
            "type": "String",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Time of last update</p>"
          },
          {
            "group": "201",
            "type": "Object",
            "optional": false,
            "field": "_issue",
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
    "url": "/api/v1/comments",
    "title": "Get comments",
    "name": "GetComments",
    "group": "Comment",
    "description": "<p>Get all comments or the comments for the issue with :_issue id</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "_issue",
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
            "type": "Object[]",
            "optional": false,
            "field": "body",
            "description": "<p>Array of comments</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "body.text",
            "description": "<p>Comment text</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "body.createdAt",
            "description": "<p>Time of creation</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "body.updatedAt",
            "description": "<p>Time of last update</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "body.issue",
            "description": "<p>Issue that belongs to</p>"
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
    "type": "post",
    "url": "/api/v1/issues",
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
            "type": "String",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Time of last update</p>"
          },
          {
            "group": "201",
            "type": "String[]",
            "optional": false,
            "field": "attachments",
            "description": "<p>Issue attachments ids</p>"
          },
          {
            "group": "201",
            "type": "String[]",
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
    "url": "/api/v1/issues/:id",
    "title": "Delete issue",
    "name": "DeleteIssue",
    "group": "Issue",
    "description": "<p>Delete the issue with :id</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
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
    "url": "/api/v1/issues/:id",
    "title": "Get ssue",
    "name": "GetIssue",
    "group": "Issue",
    "description": "<p>Get issue with given :id with all of its files and with comment ids</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
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
            "type": "String[]",
            "optional": false,
            "field": "attachments",
            "description": "<p>Issue attachments ids</p>"
          },
          {
            "group": "200",
            "type": "String[]",
            "optional": false,
            "field": "comments",
            "description": "<p>Issue comment ids</p>"
          }
        ],
        "201": [
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Time of last update</p>"
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
            "type": "Object[]",
            "optional": false,
            "field": "body",
            "description": "<p>Array of issues</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "body.status",
            "description": "<p>Status of the Issue</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "body.createdAt",
            "description": "<p>Time of creation</p>"
          },
          {
            "group": "200",
            "type": "String[]",
            "optional": false,
            "field": "issues.attachments",
            "description": "<p>Issue attachments ids</p>"
          },
          {
            "group": "200",
            "type": "String[]",
            "optional": false,
            "field": "issues.comments",
            "description": "<p>Issue comment ids</p>"
          }
        ],
        "201": [
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "body.updatedAt",
            "description": "<p>Time of last update</p>"
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
    "type": "put",
    "url": "/api/v1/issues/:id",
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
            "type": "String",
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
            "type": "String[]",
            "optional": false,
            "field": "attachments",
            "description": "<p>Issue attachments ids</p>"
          },
          {
            "group": "200",
            "type": "String[]",
            "optional": false,
            "field": "comments",
            "description": "<p>Issue comment ids</p>"
          }
        ],
        "201": [
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Time of last update</p>"
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
