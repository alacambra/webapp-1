requirejs.config({
    baseUrl: 'js',

    paths: {
        // vendor
        backbone: 'lib/vendor/backbone',
        backbone_faux_server: 'lib/vendor/backbone-faux-server',
        backbone_syphon: 'lib/vendor/backbone.syphon',
        bootstrap: 'lib/vendor/bootstrap',
        i18n: 'lib/vendor/i18n',
        jquery: 'lib/vendor/jquery',
        jquery_elastic: 'lib/vendor/jquery-elastic',
        jquery_ui: 'lib/vendor/jquery-ui',
        marionette: 'lib/vendor/backbone.marionette',
        moment: 'lib/vendor/moment',
        textile: 'lib/vendor/textile',
        tpl: 'lib/vendor/tpl',
        underscore: 'lib/vendor/underscore',

        // custom libs
        advanced_string: 'lib/advanced_string',
        behaviour: 'lib/behaviour',
        tools: 'lib/tools',

        // locales
        locale_de: 'locales/de',
        locale_en: 'locales/en'
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
        i18n: { exports: 'I18n' },
        jquery: { exports: 'jQuery' },
        jquery_elastic: { deps: ['jquery'] },
        jquery_ui: { deps: ['jquery'] },
        underscore: { exports: '_' },

        behaviour: { deps: ['jquery'] },

        locale_de: { deps: ['i18n'] },
        locale_en: { deps: ['i18n'] }
    }
});

require(['app', 'underscore', 'bootstrap', 'behaviour', 'tools', 'i18n'], function(App) {
    App.start();
});
