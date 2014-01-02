module.exports = function (grunt) {

    function exclude_sass_files(file) {
        return !file.match(/.sass$/);
    }

    function exclude_example_files(file) {
        return !file.match(/.example$/);
    }

    // Project configuration.
    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'dist/css/base.css': 'css/base.sass'    // 'destination path': 'source path'
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
                    'js/lib/**/*.js',
                    'test/SpecRunner.js',
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
        },

        clean: {
            dist: {
                files: {
                    src: [
                        'dist/'
                    ]
                }
            }
        },

        copy: {
            dist: {
                files: [
                    { expand: true, src: [ 'index.html' ], dest: 'dist/' },
                    { expand: true, src: [ 'css/**' ], dest: 'dist/', filter: exclude_sass_files },
                    { expand: true, src: [ 'fonts/**' ], dest: 'dist/' },
                    { expand: true, src: [ 'img/**' ], dest: 'dist/' },
                    { expand: true, src: [ 'js/**' ], dest: 'dist/', filter: exclude_example_files}
                ]
            }
        }
    });

    // Load plugins here
    grunt.loadNpmTasks('grunt-contrib');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task.
    grunt.registerTask('default', 'watch');

    // SpecRunner task.
    grunt.registerTask('unittest', ['connect:livereload', 'watch:livereload']);

    // Build task.
    grunt.registerTask('build', [
        'clean:dist',
        'sass:dist',
        'copy:dist' ]);
};