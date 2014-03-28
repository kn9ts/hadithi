'use strict';

module.exports = function(grunt) {

    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt); 
    //Equivalent to
    // require('load-grunt-tasks')(grunt, {pattern: 'grunt-*'});
    // require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks); //using matchdep

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Concat is a pretty simple task that does exactly what you think it does.
        // concatenate files.
        concat: {
            css: {
                src: ["assets/css/bootstrap.min.css", "assets/css/font-awesome.min.css", "assets/css/ace-fonts.css", "assets/css/ace.min.css", "assets/css/ace-skins.min.css", "assets/css/bootstrap-modal.css", "audiojs/audio-js.css", "audiojs/skins/tube.css", 'audio/**/*.css'],
                dest: 'assets/css/application.css'
            },
            js: {
                options: {
                    seperator: ';'
                },
                // src: ['assets/**/*.js', 'js/**/*.js']
                //ljzb -- "js/LJZB.lib.js",
                //jszipp -- "js/jszip.min.js"
                src: ["!js/lib/zip.js", "assets/js/ace-extra.min.js", "assets/js/jquery-1.10.2.min.js", "assets/js/bootstrap.min.js", "!assets/js/ace-elements.min.js", "!assets/js/ace.min.js", "assets/js/bootstrap-modal.js", "assets/js/bootstrap-modalmanager.js", "!js/bootbox.min.js", "js/modernizr.custom.96386.js", "js/recorder.js", "audiojs/audio.js", "js/application.js"],
                dest: 'assets/js/application.js'
            }
        },
        //Minify the CSS concentanated application.css
        cssmin: {
            options: {
                // banner: '/* My minified css file */',
                keepSpecialComments: '1', // '*' or 1 or 0
                report: 'min' // 'gzip'
            },
            css: {
                src: 'assets/css/application.css',
                dest: 'assets/css/application.min.css'
            }
        },
        //Your CSS has now been combined and compressed. 
        //Lets compress your JavaScript code now by adding a new task called uglify.
        //Uglify does what cssmin does to css, only with javascript.
        uglify: {
            dynamic_mapping: {
                files: [{
                    // expand: true,
                    src: 'assets/js/application.js',
                    dest: "assets/js/application.min.js"
                }]
            }
        },
        // Compile Jade templates.
        jade: {
            compile: {
                options: {
                    pretty: true
                },
                files: {
                    //The path to compile to and the path to where to get the jade files
                    "tellme/index.html": ['index.jade'],
                    "tellme/index.min.html": ['index.min.jade']
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            afterconcat: ['Gruntfile.js', 'js/application.js']
        },
        // grunt-open will open your browser at the project's URL
        // https://www.npmjs.org/package/grunt-open
        express: {
            server: {
                options: {
                    port: 1515,
                    bases: ['assets', 'audiojs', 'js'],
                    hostname: "localhost",
                    livereload: true
                    // serverreload: true
                }
            }
        },
        // grunt-open will open your browser at the project's URL
        // https://www.npmjs.org/package/grunt-open
        open: {
            server: {
                path: 'http://localhost:1515/tellme/index.html'
            }
        },
        // Wouldn't it be awesome if grunt did all of this automatically every time we changed a file?
        // Watch is a grunt plugin written to do just that.
        // Run predefined tasks whenever watched file patterns are added, changed or deleted.
        //Grouped the files to run specific tasks that are unique to each;
        watch: {
            css: {
                files: ["**/*.css", 'assets/css/**/*.css'],
                tasks: ['concat:css', 'cssmin:css']
            },
            scripts: {
                files: ['js/**/*.js', '!js/libmp3lame.min.js'], //dont watch the libmp3lame.min.js
                tasks: ['concat:js', 'jshint', 'uglify']
            },
            jade: {
                files: ['**/*.jade'],
                tasks: ['jade', 'watch:scripts']
            },
            gruntfile: {
                files: ['Gruntfile.js'],
                tasks: ['jshint', 'concat:js', 'jshint', 'uglify']
            }
            // server: {
            //     files: ["**/*.js", '!js/libmp3lame.min.js'],
            //     options: {
            //         livereload: true
            //     }
            // }
        }
    });

    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln("INFO: -- " + target + ': ' + filepath + ' has ' + action);
        // grunt.config(['jshint', 'all'], filepath);
    });

    grunt.registerTask('serve', ['express', 'open', 'watch:server']);

    // These plugins provide necessary tasks. -- loading grunt plugins
    // grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-contrib-cssmin');
    // grunt.loadNpmTasks('grunt-contrib-jade');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-jade');
    // grunt.loadNpmTasks('grunt-contrib-nodeunit');
    // grunt.loadNpmTasks('grunt-contrib-jshint');
    // grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task.
    // grunt.registerTask('default', ['jshint', 'nodeunit']);
    grunt.registerTask('default', ['jade', 'concat:css', 'cssmin:css', 'concat:js', 'uglify', 'jshint', 'watch']);

};