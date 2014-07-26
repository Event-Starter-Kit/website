# Web European Conference Website

## Set up

Install Node.js and then:

	$ sudo npm install -g bower
	$ sudo npm install -g grunt-cli
	$ sudo npm install -g karma
	
Go inside `./src` folder

    $ npm install
    $ bower install
    
Go inside `./grunt` folder

    $ npm install
    $ bower install

This will set up the development environment and download any dependencies.

Run the following command to compile the project to the `dist` directory:

    $ grunt build

For development you can run the following command to watch for changes and auto-compile:

    $ grunt server

## Compiled project


**PLEASE NOTE:** Don't edit the files in the `compiled` directory. Any changes will be overwritten the next time the project is compiled.