# API Documentation #

The APIs exposed by the website are documented using [Apidocjs](http://apidocjs.com/) using a specific [Grunt](http://gruntjs.com/) task.

Here there is an example of documentation

```
/**
         * @api {post} /api/notify/join/ Join the newsletter
         * @apiName JoinNewsletter
         * @apiGroup Newsletter
         * @apiVersion 1.0.0
         *
         * @apiParam {string} email The email to join.
         *
         * @apiErrorTitle (400) 400 Bad Request
         * @apiError (400) email The specifiend email is null or the format is invalid.
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *     {
         *       [{
         *           "param": "email",
         *           "msg": "Field required"
         *       }, {
         *           "param": "email",
         *           "msg": "Invalid email format"
         *       }]
         *     }
         * 
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 500 Internal Server Error
         *     {
         *       Something went wrong. Please try again.
         *     }
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 201 Created
         *     {
         *       Thanks for signing up!
         *     }
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 304 Not Modified
         *     {
         *       User already subscribed
         *     }
         */
```

There are several option in the documentation, so I suggest you to read this [page](http://apidocjs.com/) before start to document your APIs

When your documentation is ready is enough to run the specific task in the grunt directory

```
$ cd grunt
$ grunt generateDoc
```

When the task is complite, run the website and check the documentation on `/apidoc/`

