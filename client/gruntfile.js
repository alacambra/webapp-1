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
                    'test/spec/**/*.spec.js'
                ]
            },
            test: {
                tasks: 'jasmine:test',
                files: [
                    'js/*.js',
                    'js/app/**/*.js',
                    'js/app/**/*.tpl',
                    'js/lib/**/*.js',
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
                    open: 'http://localhost:9000'
                }
            },
            test: {
                options: {
                    port: 8000
                }
            }
        },

        jasmine: {
            test: {
                src: 'js/app/**/*.js',
                options: {
                    specs: 'test/spec/**/*.spec.js',
                    vendor: 'js/lib/vendor/i18n.js',
                    helpers: 'test/lib/test_helper.js',
                    host: 'http://127.0.0.1:<%= connect.test.options.port %>/',
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfigFile: 'js/require_main.js'
                    }
                }
            }
        },

        clean: {
            files: {
                src: [
                    'dist/',
                    'doc/'
                ]
            }
        },

        copy: {
            dist: {
                files: [
                    { expand: true, src: [ 'css/images/*' ], dest: 'dist' },
                    { expand: true, src: [ 'fonts/**' ], dest: 'dist/' },
                    { expand: true, src: [ 'img/**' ], dest: 'dist/' }
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
                    'dist/css/style.css': [
                        'css/bootstrap.css',
                        'css/jquery-ui.css',
                        'dist/css/style.css' // include and overwrite compiled base.sass (compiled to dist/css/style.css by sass:dist)
                    ]
                }
            }
        },

        uglify: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'js/locales',
                        src: '*.js',
                        dest: 'dist/js/locales'
                    }
                ]
            }
        },

        jsdoc: {
            dist: {
                src: [
                    'js/app.js',
                    'js/config.example.js',
                    'js/app/**/*.js',
                    'js/lib/*.js'
                ],
                options: {
                    destination: 'doc'
                }
            }
        }
    });

    // Load plugins here
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-requirejs');

    // Default task. Starts a node js server that refreshes on app changes.
    grunt.registerTask('default', [
        'connect:livereload',
        'watch:livereload'
    ]);

    // Build task. Builds the app into dist folder.
    grunt.registerTask('build', [
        'test',
        'clean',
        'sass:dist',
        'cssmin:combine',
        'processhtml',
        'requirejs:compile',
        'uglify',
        'copy:dist'
    ]);

    // Test task. A single test run.
    grunt.registerTask('test', [
        'connect:test',
        'jasmine:test'
    ]);

    // Test task. Runs test on every app change.
    grunt.registerTask('testing', [
        'connect:test',
        'watch:test'
    ]);
};