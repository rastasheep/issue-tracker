# curl demostration commands

  - [Issues](#issues)
  - [Comments](#comments)
  - [Attachments](#attachments)

## Issues

  - Create issue
    ```sh
    curl -d '{}' -H "Content-Type: application/json" -X POST http://localhost:8001/api/v1/issues
    ```

  - Get issues
    ```sh
    curl http://localhost:8001/api/v1/issues
    ```

  - Get issue (id from command above)
    ```sh
    curl http://localhost:8001/api/v1/issues/5a0032e38da31f0053a473d2
    ```

  - Delete issue
    ```sh
    curl -X "DELETE" http://localhost:8001/api/v1/issues/5a0032e38da31f0053a473d2
    ```

## Comments
  - Create comment (issue from command above)
    ```sh
    curl -d '{"_issue": "5a0033d18da31f0053a473d3", "text": "my first comment" }' -H "Content-Type: application/json" -X POST http://localhost:8001/api/v1/comments
    ```

  - Get comments
    ```sh
    curl http://localhost:8001/api/v1/comments
    ```

  - Get comments for one issue (id from command above)
    ```sh
    curl "http://localhost:8001/api/v1/comments?_issue=5a00344d8da31f0053a473d5"
    ```

## Attachments

  - Create attachment with file (id from command above)
    ```sh
    curl -F _issue=5a00344d8da31f0053a473d5 -F file=@data.csv http://localhost:8001/api/v1/attachments
    ```

  - Get attachment (id from command above)
    ```sh
    curl http://localhost:8001/api/v1/attachments/5a0035398da31f0053a473d7
    ```

  - Get attachments
    ```sh
    curl http://localhost:8001/api/v1/attachments
    ```

  - Get attachments for one issue (id from command above)
    ```sh
    curl "http://localhost:8001/api/v1/attachments?_issue=5a00344d8da31f0053a473d5"
    ```

  - Get attachment's file (file id from command above)
    ```sh
    curl http://localhost:8001/api/v1/files/1509963065715-83-e1074f1dc8e6d75a
    ```
