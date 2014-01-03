module.exports = function (grunt) {
    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'dist/css/style.css': 'css/base.sass' // will be overwritten during ccsmin:combine
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
                    { expand: true, src: [ 'css/images/*' ], dest: 'dist' },
                    { expand: true, src: [ 'fonts/**' ], dest: 'dist/' },
                    { expand: true, src: [ 'img/**' ], dest: 'dist/' },
                    { expand: true, src: [ 'js/locales/*.*' ], dest: 'dist/' }
                ]
            }
        },

        processhtml: {
            dev: {
                files: {
                    'dist/index.html': ['index.html']
                }
            }
        },


        requirejs: {
            compile: {
                options: {
                    baseUrl: 'js',
                    name: 'lib/vendor/require',
                    include: 'require_main',
                    mainConfigFile: 'js/require_main.js',
                    out: 'dist/js/application.js',
                    findNestedDependencies: true
                }
            }
        },

        cssmin: {
            combine: {
                files: {
                    // include and overwrite compiled base.sass (compiled to dist/css/style.css by sass:dist)
                    'dist/css/style.css': ['css/*.css', 'dist/css/style.css']
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
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-requirejs');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task.
    grunt.registerTask('default', 'watch');

    // SpecRunner task.
    grunt.registerTask('unittest', ['connect:livereload', 'watch:livereload']);

    // Build task.
    grunt.registerTask('build', [
        'clean:dist',
        'sass:dist',
        'cssmin:combine',
        'processhtml',
        'requirejs:compile',
        'copy:dist'
    ]);
};