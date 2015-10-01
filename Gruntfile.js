var path = require('path');

var port = '5000';

module.exports = function(grunt) {
    grunt.initConfig({
        concurrent: {
            dev: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        nodemon: {
            dev: {
                script: 'src/app.js',
                options: {
                    args: ['env:dev'],
                    nodeArgs: ['--debug'],
                    env: {
                        PORT: port
                    },
                    ext: 'js,coffee,vash',
                    // note - this only watches your node server and gruntfile
                    watch: [
                        'src/**/*',
                        'GruntFile.js'
                    ],
                    ignore: [
                        'node_modules/**',
                        'src/public/**/*'
                    ],
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
            options: {
                livereload: true
            },
            server: {
                files: ['.rebooted'],
            },
            frontend: {
                files: 'src/public/**/*',
                tasks: ['uglify:js']
            }
        },
        uglify: {
            options: {
                beautify: false
            },
            js: {
                sourceMap: true,
                files: {
                    // this seems wrong to me! The files don't exist
                    'src/public/js/combined.min.js': [
                                            'src/public/js/vendor/jquery.js', 
                                            'src/public/js/foundation.min.js',
                                            'src/public/js/countdown.js',
                                            'src/public/js/owl-carousel.js',
                                            'src/public/js/jquery.backstretch.js',
                                            'src/public/js/custom.js'
                                        ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-nodemon');
    
    
    grunt.registerTask('build', ['uglify:js']);
    grunt.registerTask('default', ['concurrent:dev', 'uglify:js']);
};
