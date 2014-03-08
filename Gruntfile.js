'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Concat is a pretty simple task that does exactly what you think it does.
        // concatenate files.
        concat: {
            css: {
                src: ['assets/**/*.css', 'audio/**/*.css'],
                dest: 'dist/concatenated.css'
            },
            js: {
                options: {
                    seperator: ';'
                },
                // src: ['assets/**/*.js', 'js/**/*.js'],
                src: ["assets/js/ace-extra.min.js", "assets/js/jquery-2.0.3.min.js", "assets/js/bootstrap.min.js", "assets/js/ace-elements.min.js", "assets/js/ace.min.js", "assets/js/bootstrap-modal.js", "assets/js/bootstrap-modalmanager.js", "js/modernizr.custom.96386.js", "js/recorder.js", "audiojs/audio.js", "js/application.js"],
                dest: 'dist/concatenated.js'
            }
        },
        //Minify the CSS concatenated
        cssmin: {
            css: {
                src: 'dist/concatenated.css',
                dest: 'dist/concatenated.min.css'
            }
        },
        //Your CSS has now been combined and compressed. 
        //Lets compress your JavaScript code now by adding a new task called uglify.
        //Uglify does what cssmin does to css, only with javascript.
        uglify: {
            dynamic_mapping: {
                files: [{
                    // expand: true,
                    src: 'dist/concatenated.js',
                    dest: "dist/concatenated.min.js"
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
                jshintrc: '.jshintrc'
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            afterconcat: ['Gruntfile.js', 'js/application.js']
        },
        // Wouldn't it be awesome if grunt did all of this automatically every time we changed a file?
        // Watch is a grunt plugin written to do just that.
        watch: {
            files: ['**/*.jade', 'assets/css/**.js', 'js/**/*.js', 'assets/**/*.js', 'Gruntfile.js'],
            tasks: ['concat', 'cssmin', 'uglify',  'jade', 'jshint']
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task.
    grunt.registerTask('default', ['jshint', 'nodeunit']);
    grunt.registerTask('default', ['concat:css', 'cssmin:css', 'concat:js', 'uglify', 'jade', 'jshint', 'watch']);

};