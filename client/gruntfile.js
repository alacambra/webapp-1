module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'css/base.css' : 'css/base.sass'
                }
            }
        },

        watch: {
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'js/*.js',
                    'js/app/**/*.js',
                    'js/app/**/*.tpl',
                    'test/spec/*.spec.js',
                    'test/spec/**/*.spec.js'
                ]
            }
//            specs: {
//                files: ['test/spec/*.spec.js'],
//                tasks: 'jasmine'
//            },
//            sass: {
//                files: ['css/*.sass'],
//                tasks: 'sass'
//            }
        },

        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: 'http://localhost:9000/test/SpecRunner.html'
                }
            }
        }
    });

    // Load plugins here
    grunt.loadNpmTasks('grunt-contrib');
    grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Default task.
    grunt.registerTask('default', 'watch');

    // SpecRunner task.
    grunt.registerTask('unittest', ['connect:livereload', 'watch:livereload']);
};