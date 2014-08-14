var path = require('path');

var port = '5000';

module.exports = function(grunt) {
    grunt.initConfig({
        concurrent: {
            dev: {
                tasks: ['nodemon', 'node-inspector', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        apidoc: {
            api: {
                src: "../src/",
                dest: "../src/public/apidoc/",
                options: {
                    debug: true,
                    includeFilters: [".*\\.js$"],
                    excludeFilters: ["node_modules/"],
                    marked: {
                        gfm: true
                    }
                }
            }
        },
        nodemon: {
            dev: {
                script: '../src/app.js',
                options: {
                    args: ['env:dev'],
                    nodeArgs: ['--debug'],
                    env: {
                        PORT: port
                    },
                    ext: 'js,coffee',
                    watch: ['../src/', 'gruntfile.js'],
                    ignore: ['node_modules/**'],
                    // omit this property if you aren't serving HTML files and 
                    // don't want to open a browser tab on start
                    callback: function(nodemon) {
                        nodemon.on('log', function(event) {
                            console.log(event.colour);
                        });

                        // opens browser on initial server start
                        nodemon.on('config:update', function() {
                            // Delay before server listens on port
                            setTimeout(function() {
                                require('open')('http://localhost:' + port);
                            }, 1000);
                        });

                        // refreshes browser when server reboots
                        nodemon.on('restart', function() {
                            // Delay before server listens on port
                            setTimeout(function() {
                                require('fs').writeFileSync('.rebooted', 'rebooted');
                            }, 1000);
                        });
                    }
                }
            }
        },
        watch: {
            server: {
                files: ['.rebooted'],
                options: {
                    livereload: true
                }
            }
        },
        uglify: {
            options: {
                beautify: false
            },
            js: {
                sourceMap: true,
                files: {
                    '../src/public/js/combined.min.js': [
                        '../src/public/js/vendor/jquery.js',
                        '../src/public/js/foundation.min.js',
                        '../src/public/js/countdown.js',
                        '../src/public/js/owl-carousel.js',
                        '../src/public/js/jquery.backstretch.js',
                        '../src/public/js/custom.js'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-apidoc');


    grunt.registerTask('build', ['uglify:js']);
    grunt.registerTask('generateDoc', ['apidoc:api']);
    grunt.registerTask('serve', ['nodemon:dev', 'watch:server', 'uglify:js']);
    grunt.registerTask('superServe', ['apidoc:api','nodemon:dev', 'watch:server', 'uglify:js']);
};
