requirejs.config({
    baseUrl: 'js',

    paths: {
        backbone: 'lib/vendor/backbone',
        backbone_syphon: 'lib/vendor/backbone.syphon',
        bootstrap: 'lib/vendor/bootstrap',
        jquery: 'lib/vendor/jquery',
        marionette: 'lib/vendor/backbone.marionette',
        moment: 'lib/vendor/moment',
        tpl: 'lib/vendor/tpl',
        underscore: 'lib/vendor/underscore',

        advanced_string: 'lib/advanced_string',
        behaviour: 'lib/behaviour',

        backbone_faux_server: 'lib/vendor/backbone-faux-server'
    },

    shim: {
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'Bootstrap'
        },
        backbone_syphon: ['backbone'],
        backbone_faux_server: {
            deps: ['backbone', 'underscore'],
            exports: 'Faux'
        },
        marionette: {
            deps: ['backbone'],
            exports: 'Marionette'
        },
        underscore: {
            exports: '_'
        },

        behaviour: {
            deps: ['jquery'],
            exports: 'advanced_string'
        }
    }
});

require(['app', 'bootstrap', 'behaviour'], function(App) {
    App.start();
});
