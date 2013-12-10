requirejs.config({
    baseUrl: 'js',

    paths: {
        backbone: 'lib/vendor/backbone',
        backbone_syphon: 'lib/vendor/backbone.syphon',
        jquery: 'lib/vendor/jquery',
        marionette: 'lib/vendor/backbone.marionette',
        moment: 'lib/vendor/moment',
        tpl: 'lib/vendor/tpl',
        underscore: 'lib/vendor/underscore',

        advanced_string: 'lib/advanced_string',
        behaviour: 'lib/behaviour'
    },

    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        backbone_syphon: ['backbone'],
        marionette: {
            deps: ['backbone'],
            exports: 'Marionette'
        },

        behaviour: {
            deps: ['jquery'],
            exports: 'advanced_string'
        }
    }
});

require(['app',
         'moment',
         'advanced_string',
         'behaviour'],
        function(TaskApp) {

    TaskApp.start();
});
