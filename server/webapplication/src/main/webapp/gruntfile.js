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

        jasmine: {
            specs: {
                src: [
                    'js/libs/underscore.min.js'
                ],
                options: {
                    specs: 'test/spec/*.spec.js',
                    helpers: 'spec/*.helper.js'
                }
            }
        },

        watch: {
            specs: {
                files: ['test/spec/*.spec.js'],
                tasks: 'jasmine'
            }/*,
            sass: {
                files: ['css/*.sass'],
                tasks: 'sass'
            }*/
        }
    });

    // Load plugins here
    grunt.loadNpmTasks('grunt-contrib');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    // Default task.
    grunt.registerTask('default', 'watch');

    // Test task.
    grunt.registerTask('test', 'jasmine');
};