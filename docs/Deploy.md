# Web European Conference Website

## Deploying for QA

There is a QA environment available here: [http://demo.webnextconf.eu](http://demo.webnextconf.eu)

To update it first compile the project:

    $ grunt build

Then commit and push your changes into the **deploy** branch:

    $ git add .
    $ git commit -m "[commit message]"
    $ git push origin master:deploy
